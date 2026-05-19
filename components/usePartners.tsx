/**
 * usePartners.tsx
 * 
 * @2026 Digital Aid Seattle
 */
import { CodaPartnerService } from "services/codaPartnerService";
import { DASPartner } from "types";
import { useCachedResource } from "./CacheFactory";

export function usePartners() {
  const service = CodaPartnerService.getInstance();
  return useCachedResource<DASPartner[]>({
    key: "partners",
    fetcher: async () => { return await service.getAll() }
  });
}
