import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const sanityClient = (token?: string, useCdn?: boolean) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token })
    : null
}