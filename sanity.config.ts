/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

export default defineConfig([
  {
    name: 'prod',
    projectId,
    dataset: 'production',
    basePath: '/studio',
    schema,
    plugins: [
      structureTool({
        structure: (S, context) => {
          return S.list()
            .title('Content')
            .items([
              // Minimum required configuration
              orderableDocumentListDeskItem({ type: 'os-event', S, context }),
              orderableDocumentListDeskItem({ type: 'das-project', S, context }),
              orderableDocumentListDeskItem({ type: 'das-feature', S, context }),
              orderableDocumentListDeskItem({ type: 'das-faq', S, context }),
              orderableDocumentListDeskItem({ type: 'das-testimonial', S, context }),
              orderableDocumentListDeskItem({ type: 'das-page-copy', S, context }),
              orderableDocumentListDeskItem({ type: 'das-newsletter', S, context })
            ])
        }
      }
      ),
      // Vision lets you query your content with GROQ in the studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion })
    ]
  },
  {
    name: 'dev',
    projectId,
    dataset: 'development',
    basePath: '/dev-studio',
    schema,
    plugins: [
      structureTool({
        structure: (S, context) => {
          return S.list()
            .title('Content')
            .items([
              // Minimum required configuration
              orderableDocumentListDeskItem({ type: 'os-event', S, context }),
              orderableDocumentListDeskItem({ type: 'das-project', S, context }),
              orderableDocumentListDeskItem({ type: 'das-feature', S, context }),
              orderableDocumentListDeskItem({ type: 'das-faq', S, context }),
              orderableDocumentListDeskItem({ type: 'das-testimonial', S, context }),
              orderableDocumentListDeskItem({ type: 'das-page-copy', S, context }),
              orderableDocumentListDeskItem({ type: 'das-newsletter', S, context })
            ])
        }
      }
      ),
      // Vision lets you query your content with GROQ in the studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion })
    ]
  }
])
