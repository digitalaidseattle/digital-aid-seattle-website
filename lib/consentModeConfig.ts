export type ConsentModeValue = 'denied' | 'granted'

export type ConsentModeSettings = {
  analytics_storage: ConsentModeValue
  ad_storage: ConsentModeValue
  ad_user_data: ConsentModeValue
  ad_personalization: ConsentModeValue
}

export const getConsentModeSettings = (
  value: ConsentModeValue
): ConsentModeSettings => ({
  analytics_storage: value,
  ad_storage: value,
  ad_user_data: value,
  ad_personalization: value,
})
