import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
    name: 'team-member',
    type: 'document',
    title: 'Team Member',
    orderings: [orderRankOrdering],
    fields: [
      orderRankField({ type: "team-member" }),
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'role',
        type: 'string',
        title: 'Role'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
            {
                name: 'alt',
                title: 'Alt',
                type: 'string'
            }
        ]
      },
    ]
  }