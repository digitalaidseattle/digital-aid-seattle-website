import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CONSENT_STORAGE_KEY } from 'lib/cookieConsent'
import { CookieConsentProvider, useCookieConsent } from './useCookieConsent'

let originalCookieDescriptor: PropertyDescriptor | undefined

const Controls = () => {
  const {
    accept,
    consent,
    isInitialized,
    markTrackingTagLoaded,
    reject,
    reset,
  } = useCookieConsent()
  if (!isInitialized) return null

  return (
    <>
      <span>{consent}</span>
      <button onClick={accept}>accept</button>
      <button onClick={reject}>reject</button>
      <button onClick={markTrackingTagLoaded}>mark tracking loaded</button>
      <button onClick={reset}>reset</button>
    </>
  )
}

afterEach(() => {
  cleanup()
  localStorage.clear()
  delete window.dataLayer
  delete window.__dasConsentDefaultsQueued
  if (originalCookieDescriptor) {
    Object.defineProperty(document, 'cookie', originalCookieDescriptor)
  } else {
    delete (document as unknown as Record<string, unknown>).cookie
  }
  originalCookieDescriptor = undefined
})

describe('CookieConsentProvider', () => {
  it('queues denied defaults before granted consent and persists acceptance', async () => {
    render(
      <CookieConsentProvider>
        <Controls />
      </CookieConsentProvider>
    )

    await screen.findByText('unknown')
    fireEvent.click(screen.getByRole('button', { name: 'accept' }))

    expect(screen.getByText('accepted')).toBeInTheDocument()
    expect(
      JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) ?? '{}')
    ).toMatchObject({
      status: 'accepted',
      version: 1,
    })
    expect(window.dataLayer?.map((entry) => Array.from(entry))).toEqual([
      [
        'consent',
        'default',
        {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        },
      ],
      [
        'consent',
        'update',
        {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        },
      ],
    ])
    expect(
      window.dataLayer?.every(
        (entry) =>
          Object.prototype.toString.call(entry) === '[object Arguments]'
      )
    ).toBe(true)
  })

  it('expires audited Google cookies when consent is rejected', async () => {
    const cookieWrites: string[] = []
    originalCookieDescriptor = Object.getOwnPropertyDescriptor(
      document,
      'cookie'
    )
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      set: (value: string) => cookieWrites.push(value),
    })

    render(
      <CookieConsentProvider>
        <Controls />
      </CookieConsentProvider>
    )

    await screen.findByText('unknown')
    fireEvent.click(screen.getByRole('button', { name: 'reject' }))

    expect(screen.getByText('rejected')).toBeInTheDocument()
    expect(cookieWrites).toHaveLength(3)
    expect(cookieWrites.map((write) => write.split('=')[0])).toEqual([
      '_ga',
      '_ga_YZL6BVC5N9',
      '_gcl_au',
    ])
    expect(cookieWrites).not.toEqual(
      expect.arrayContaining([expect.stringMatching(/^csrf_token=/)])
    )

    cookieWrites.forEach((write) => {
      expect(write).toContain('Domain=.digitalaidseattle.org')
      expect(write).toContain('Path=/')
      expect(write).toContain('Max-Age=0')

      const expires = write.match(/Expires=([^;]+)/)?.[1]
      expect(expires).toBeDefined()
      expect(new Date(expires ?? '').getTime()).toBeLessThan(Date.now())
    })
  })

  it('clears saved consent and returns to unknown on reset', async () => {
    render(
      <CookieConsentProvider>
        <Controls />
      </CookieConsentProvider>
    )

    await screen.findByText('unknown')
    fireEvent.click(screen.getByRole('button', { name: 'reject' }))
    fireEvent.click(screen.getByRole('button', { name: 'reset' }))

    await waitFor(() => expect(screen.getByText('unknown')).toBeInTheDocument())
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull()
  })

  it('reloads only when resetting a session that loaded tracking', async () => {
    const reloadPage = vi.fn()

    render(
      <CookieConsentProvider reloadPage={reloadPage}>
        <Controls />
      </CookieConsentProvider>
    )

    await screen.findByText('unknown')
    fireEvent.click(screen.getByRole('button', { name: 'accept' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'mark tracking loaded' })
    )
    fireEvent.click(screen.getByRole('button', { name: 'reset' }))

    expect(reloadPage).toHaveBeenCalledOnce()
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull()
  })
})
