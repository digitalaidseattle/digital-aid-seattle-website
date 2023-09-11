import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'

import { createClient } from 'next-sanity'

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(__dirname, dev, { info: () => null, error: console.error })

// @TODO report top-level await bug
// Using a dynamic import here as `loadEnvConfig` needs to run before this file is loaded
// const { projectId, dataset } = await import('lib/sanity.api')
import { apiVersion, dataset, projectId } from './sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
const config = defineCliConfig({ api: { projectId, dataset } })

export default config
