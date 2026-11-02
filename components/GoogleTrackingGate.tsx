import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect } from 'react'

import { useCookieConsent } from 'hooks/useCookieConsent'
import { ConversionTracker } from './ConversionTracker'

export const GOOGLE_TRACKING_ENABLED = true

export const GoogleTrackingGate = ({
  trackingEnabled = GOOGLE_TRACKING_ENABLED,
}: {
  trackingEnabled?: boolean
}) => {
  const { consent, markTrackingTagLoaded } = useCookieConsent()
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

  const canLoadTracking =
    trackingEnabled && consent === 'accepted' && Boolean(GA_ID)

  useEffect(() => {
    if (canLoadTracking) markTrackingTagLoaded()
  }, [canLoadTracking, markTrackingTagLoaded])

  if (!canLoadTracking) return null

  return (
    <>
      <GoogleAnalytics gaId={GA_ID} />
      <ConversionTracker />
    </>
  )
}
