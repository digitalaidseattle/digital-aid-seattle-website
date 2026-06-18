/**
 * useVolunteers.tsx
 * 
 * @2026 Digital Aid Seattle
 */

import { CodaRoleService } from "services/codaRoleService";
import { DASVolunteerRoleBasicInfo } from "types";
import { useCachedResource } from "./CacheFactory";

export function useActiveRoles() {
  const service = CodaRoleService.getInstance();
  return useCachedResource<DASVolunteerRoleBasicInfo[]>({
    key: "activeRoles",
    fetcher: async () => { return await service.getAllActiveRoles() }
  });
}
