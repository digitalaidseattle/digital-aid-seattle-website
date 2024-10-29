/*
* dasQandA.ts
* @2024 Digital Aid Seattle
*/

import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: 'das-testimonial',
    type: 'document',
    title: 'DAS Testimonial',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "das-testimonial" }),
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'quote',
            type: 'text',
            title: 'Quote'
        },
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
            name: 'avatar',
            type: 'image',
            title: 'Avatar',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string'
                }
            ]
        },
        {
            name: 'active',
            type: 'boolean',
            title: 'Active'
        }
    ]
}