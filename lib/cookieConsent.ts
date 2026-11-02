import {
  ConsentModeSettings,
  ConsentModeValue,
  getConsentModeSettings,
} from './consentModeConfig'

export const CONSENT_STORAGE_KEY = 'das-cookie-consent'
export const CONSENT_VERSION = 1

const CONSENT_DURATION_MONTHS = 12

export type ConsentStatus = 'unknown' | 'accepted' | 'rejected'
type StoredConsentStatus = Exclude<ConsentStatus, 'unknown'>

type StoredConsent = {
  status: StoredConsentStatus
  timestamp: number
  version: number
}

type DataLayerEntry =
  | IArguments
  | ['consent', 'default' | 'update', ConsentModeSettings]
type Gtag = (...args: unknown[]) => void

const expiresAt = (timestamp: number) => {
  const expiration = new Date(timestamp)
  expiration.setMonth(expiration.getMonth() + CONSENT_DURATION_MONTHS)
  return expiration.getTime()
}

const isStoredConsent = (value: unknown): value is StoredConsent => {
  if (!value || typeof value !== 'object') return false

  const record = value as StoredConsent
  return (
    (record.status === 'accepted' || record.status === 'rejected') &&
    Number.isFinite(record.timestamp) &&
    record.version === CONSENT_VERSION
  )
}

export const readStoredConsent = (now = Date.now()): ConsentStatus => {
  try {
    const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!storedValue) return 'unknown'

    const record = JSON.parse(storedValue)
    return isStoredConsent(record) && now < expiresAt(record.timestamp)
      ? record.status
      : 'unknown'
  } catch {
    return 'unknown'
  }
}

export const saveConsent = (
  status: StoredConsentStatus,
  timestamp = Date.now()
) => {
  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ status, timestamp, version: CONSENT_VERSION })
  )
}

export const clearStoredConsent = () => {
  window.localStorage.removeItem(CONSENT_STORAGE_KEY)
}

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[]
    gtag?: Gtag
    __dasConsentDefaultsQueued?: boolean
  }
}

const queueConsent = (
  command: 'default' | 'update',
  value: ConsentModeValue
) => {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments)
    }
  window.gtag('consent', command, getConsentModeSettings(value))
}

export const queueDeniedConsentDefaults = () => {
  if (window.__dasConsentDefaultsQueued) return

  queueConsent('default', 'denied')
  window.__dasConsentDefaultsQueued = true
}

export const queueGrantedConsentUpdate = () => {
  queueConsent('update', 'granted')
}

export const queueDeniedConsentUpdate = () => {
  queueConsent('update', 'denied')
}

const GOOGLE_COOKIE_ALLOWLIST = [
  { name: '_ga', domain: '.digitalaidseattle.org', path: '/' },
  { name: '_ga_YZL6BVC5N9', domain: '.digitalaidseattle.org', path: '/' },
  { name: '_gcl_au', domain: '.digitalaidseattle.org', path: '/' },
] as const

export const clearAuditedGoogleCookies = () => {
  if (typeof document === 'undefined') return

  GOOGLE_COOKIE_ALLOWLIST.forEach(({ name, domain, path }) => {
    document.cookie = `${name}=; Domain=${domain}; Path=${path}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  })
}

export const hasUnsavedSiteFormInput = () => {
  const fields = document.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(
    'form[data-das-form] input, form[data-das-form] textarea, form[data-das-form] select'
  )

  return Array.from(fields).some((field) => {
    if (field instanceof HTMLInputElement) {
      if (field.type === 'checkbox' || field.type === 'radio') {
        return field.checked !== field.defaultChecked
      }
      return field.value !== field.defaultValue
    }

    if (field instanceof HTMLTextAreaElement) {
      return field.value !== field.defaultValue
    }

    return Array.from(field.options).some(
      (option) => option.selected !== option.defaultSelected
    )
  })
}
