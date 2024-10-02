/*
* dasFaq.ts
* @2024 Digital Aid Seattle
*/

import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: 'das-faq',
    type: 'document',
    title: 'DAS FAQ',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "das-feature" }),
        {
            name: 'name',
            type: 'string',
            title: 'Section Name (href tag)'
        },
        {
            name: 'title',
            type: 'string',
            title: 'Section Title'
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description'
        },
        {
            name: 'icon',
            type: 'string',
            title: 'Icon'
        },
        {
            name: 'qandas',
            type: 'array',
            of: [{
                type: 'das-qanda'
            },
            ],
            title: 'Q and As',

        }
    ]
}

