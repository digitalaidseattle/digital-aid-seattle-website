import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CookieConsentProvider } from 'hooks/useCookieConsent'
import { CONSENT_STORAGE_KEY } from 'lib/cookieConsent'
import { GoogleTrackingGate } from './GoogleTrackingGate'

vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics">{gaId}</div>
  ),
}))

vi.mock('./ConversionTracker', () => ({
  ConversionTracker: () => <div data-testid="conversion-tracker" />,
}))

const renderGate = () =>
  render(
    <CookieConsentProvider>
      <GoogleTrackingGate trackingEnabled />
    </CookieConsentProvider>
  )

afterEach(() => {
  cleanup()
  localStorage.clear()
  delete window.dataLayer
  delete window.__dasConsentDefaultsQueued
  vi.unstubAllEnvs()
})

describe('GoogleTrackingGate', () => {
  it('does not load Google tracking before a visitor chooses', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-approved')

    renderGate()

    await waitFor(() => expect(window.dataLayer?.length).toBeGreaterThan(0))
    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument()
    expect(screen.queryByTestId('conversion-tracker')).not.toBeInTheDocument()
  })

  it('does not load Google tracking after rejection', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-approved')
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ status: 'rejected', timestamp: Date.now(), version: 1 })
    )

    renderGate()

    await waitFor(() => expect(window.dataLayer?.length).toBeGreaterThan(0))
    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument()
  })

  it('loads approved Google tracking after accepted consent is restored', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-approved')
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ status: 'accepted', timestamp: Date.now(), version: 1 })
    )

    renderGate()

    expect(await screen.findByTestId('google-analytics')).toHaveTextContent(
      'G-approved'
    )
    expect(screen.getByTestId('conversion-tracker')).toBeInTheDocument()
  })
})
