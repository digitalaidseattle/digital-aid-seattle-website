import { describe, expect, it } from 'vitest'

import { CONSENT_STORAGE_KEY, readStoredConsent } from './cookieConsent'

describe('readStoredConsent', () => {
  it('restores a current accepted preference', () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        status: 'accepted',
        timestamp: 1_700_000_000_000,
        version: 1,
      })
    )

    expect(readStoredConsent(1_700_000_000_000)).toBe('accepted')
  })

  it('treats an expired preference as unknown', () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        status: 'rejected',
        timestamp: 1_600_000_000_000,
        version: 1,
      })
    )

    expect(readStoredConsent(1_700_000_000_000)).toBe('unknown')
  })

  it('treats malformed, unsupported, and outdated records as unknown', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, '{')
    expect(readStoredConsent()).toBe('unknown')

    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ status: 'pending', timestamp: Date.now(), version: 1 })
    )
    expect(readStoredConsent()).toBe('unknown')

    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ status: 'accepted', timestamp: Date.now(), version: 0 })
    )
    expect(readStoredConsent()).toBe('unknown')
  })

  it('expires consent at the twelve-month boundary', () => {
    const selectedAt = new Date('2024-01-31T00:00:00.000Z').getTime()
    const expiration = new Date('2025-01-31T00:00:00.000Z').getTime()
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ status: 'accepted', timestamp: selectedAt, version: 1 })
    )

    expect(readStoredConsent(expiration)).toBe('unknown')
  })
})
