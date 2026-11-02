import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect } from 'react'

import { useCookieConsent } from 'hooks/useCookieConsent'
import { ConversionTracker } from './ConversionTracker'

// Keep false until Marketing has confirmed all deployed Google destinations and purposes.
export const GOOGLE_TRACKING_ENABLED = true

export const GoogleTrackingGate = ({
  trackingEnabled = GOOGLE_TRACKING_ENABLED,
}: {
  trackingEnabled?: boolean
}) => {
  const { consent, markTrackingTagLoaded } = useCookieConsent()
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const canLoadTracking =
    trackingEnabled && consent === 'accepted' && Boolean(gaId)

  useEffect(() => {
    if (canLoadTracking) markTrackingTagLoaded()
  }, [canLoadTracking, markTrackingTagLoaded])

  if (!canLoadTracking) return null

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <ConversionTracker />
    </>
  )
}
