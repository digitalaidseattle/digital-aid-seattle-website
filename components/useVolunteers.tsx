/**
 * useVolunteers.tsx
 * 
 * @2026 Digital Aid Seattle
 */

import { CodaVolunteerService } from "services/codaVolunteerService";
import { Volunteer } from "types";
import { useCachedResource } from "./CacheFactory";

export function useVolunteers() {
  const service = CodaVolunteerService.getInstance();
  return useCachedResource<Volunteer[]>({
    key: "volunteers",
    fetcher: async () => { return await service.getAll() }
  });
}
