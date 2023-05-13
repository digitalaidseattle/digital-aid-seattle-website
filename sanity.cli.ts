import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'
import sanityClient from '@sanity/client'

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(__dirname, dev, { info: () => null, error: console.error })

// @TODO report top-level await bug
// Using a dynamic import here as `loadEnvConfig` needs to run before this file is loaded
// const { projectId, dataset } = await import('lib/sanity.api')
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2023-05-12',
  useCdn: false,
})

const config = defineCliConfig({ api: { projectId, dataset } })

export default config
