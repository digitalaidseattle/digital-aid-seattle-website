/*
* dasFeature.ts
* @2024 Digital Aid Seattle
*/

import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
  name: 'das-feature',
  type: 'document',
  title: 'DAS Feature',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "das-feature" }),
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'enabled',
      type: 'boolean',
      title: 'Enabled',
    }
  ]
}