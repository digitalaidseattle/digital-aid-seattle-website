import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

const GA_CAMPAIGN_IDS = (process.env.NEXT_PUBLIC_GA_CAMPAIGN_IDS ?? "")
  .split(",")
  .map(id => id.trim())
  .filter(id => id.length > 0);


export function ConversionTracker() {

  useEffect(() => {
    if (GA_CAMPAIGN_IDS.length > 0) {
      GA_CAMPAIGN_IDS.forEach(id => sendGAEvent('config', id));
    }
  }, []);

  return null;

}