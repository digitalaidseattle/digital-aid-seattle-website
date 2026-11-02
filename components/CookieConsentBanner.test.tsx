import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CookieConsentBanner } from './CookieConsentBanner'

describe('CookieConsentBanner', () => {
  it('offers equally direct accept and reject choices', () => {
    const onAccept = vi.fn()
    const onReject = vi.fn()

    render(<CookieConsentBanner onAccept={onAccept} onReject={onReject} />)

    fireEvent.click(screen.getByRole('button', { name: 'Reject optional' }))
    fireEvent.click(screen.getByRole('button', { name: 'Accept optional' }))

    expect(onReject).toHaveBeenCalledOnce()
    expect(onAccept).toHaveBeenCalledOnce()
    expect(
      screen.getByText(
        'We use essential cookies to keep this site working. With your permission, we also use analytics cookies to understand how visitors use the site and improve it.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Your cookie choices')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Cookie policy' })).toHaveAttribute(
      'href',
      '/privacy'
    )
    expect(
      screen.queryByRole('link', { name: 'Cookie settings' })
    ).not.toBeInTheDocument()
  })
})
