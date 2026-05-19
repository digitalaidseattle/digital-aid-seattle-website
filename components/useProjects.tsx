
/**
 * useProjects.tsx
 * 
 * @2026 Digital Aid Seattle
 */
import { CodaVentureService } from "services/codaVentureService";
import { useCachedResource } from "./CacheFactory";
import { DASProject } from "types";

export function useProjects() {
  const service = CodaVentureService.getInstance();
  return useCachedResource<DASProject[]>({
    key: "projects",
    fetcher: async () => { return await service.getAll() }
  });
}
