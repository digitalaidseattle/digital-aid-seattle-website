import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_CAMPAIGN_IDS = (process.env.NEXT_PUBLIC_GA_CAMPAIGN_IDS ?? "")
  .split(",")
  .map(id => id.trim())
  .filter(id => id.length > 0);


export function ConversionTracker() {

  const params = useSearchParams();

  useEffect(() => {
    const campaignId = params.get('utm_id');

    if (campaignId && window.gtag) {
      window.gtag('event', 'campaign_visit', {
        campaign_id: campaignId,
      });
    }
  }, [params]);

  return <>
    {GA_CAMPAIGN_IDS.length > 0 && (
      <script id="ga-campaign-ids">
        {GA_CAMPAIGN_IDS.map(id => `gtag('config','${id}');`).join('')}
      </script>
    )}
  </>

}