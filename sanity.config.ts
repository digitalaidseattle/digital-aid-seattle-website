/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  //edit schemas in './sanity/schema'
  schema,
  plugins: [
    deskTool({      
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({type: 'team-member', S, context})
          ])
        }
      }
    ),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion })
  ],
})
