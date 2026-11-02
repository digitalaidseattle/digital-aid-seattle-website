import { describe, expect, it } from 'vitest'

import { getConsentModeSettings } from './consentModeConfig'

describe('getConsentModeSettings', () => {
  it.each(['denied', 'granted'] as const)(
    'returns every Consent Mode v2 setting as %s',
    (value) => {
      expect(getConsentModeSettings(value)).toEqual({
        analytics_storage: value,
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
      })
    }
  )
})
