import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  clearAuditedGoogleCookies,
  clearStoredConsent,
  ConsentStatus,
  hasUnsavedSiteFormInput,
  queueDeniedConsentDefaults,
  queueDeniedConsentUpdate,
  queueGrantedConsentUpdate,
  readStoredConsent,
  saveConsent,
} from 'lib/cookieConsent'

type CookieConsentContextValue = {
  consent: ConsentStatus
  isInitialized: boolean
  accept: () => void
  reject: () => void
  reset: () => void
  markTrackingTagLoaded: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
)

export const CookieConsentProvider = ({
  children,
  reloadPage = () => window.location.reload(),
}: {
  children: ReactNode
  reloadPage?: () => void
}) => {
  const [consent, setConsent] = useState<ConsentStatus>('unknown')
  const [isInitialized, setIsInitialized] = useState(false)
  const [trackingTagLoaded, setTrackingTagLoaded] = useState(false)
  const initialized = useRef(false)
  const markTrackingTagLoaded = useCallback(
    () => setTrackingTagLoaded(true),
    []
  )

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    queueDeniedConsentDefaults()
    const savedConsent = readStoredConsent()
    if (savedConsent === 'accepted') queueGrantedConsentUpdate()
    setConsent(savedConsent)
    setIsInitialized(true)
  }, [])

  const accept = () => {
    saveConsent('accepted')
    queueDeniedConsentDefaults()
    queueGrantedConsentUpdate()
    setConsent('accepted')
  }

  const reject = () => {
    saveConsent('rejected')
    queueDeniedConsentDefaults()
    queueDeniedConsentUpdate()
    setConsent('rejected')
  }

  const reset = () => {
    const shouldReload = consent === 'accepted' && trackingTagLoaded
    if (shouldReload && hasUnsavedSiteFormInput()) {
      const confirmed = window.confirm(
        'Refreshing may lose unsubmitted form content, including content in external forms. Reset privacy preferences?'
      )
      if (!confirmed) return
    }

    clearStoredConsent()
    queueDeniedConsentUpdate()
    clearAuditedGoogleCookies()
    setConsent('unknown')
    if (shouldReload) reloadPage()
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isInitialized,
        accept,
        reject,
        reset,
        markTrackingTagLoaded,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (!context)
    throw new Error(
      'useCookieConsent must be used within CookieConsentProvider'
    )
  return context
}
