/*
* dasPageCopy.ts
* @2024 Digital Aid Seattle
*/

import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: 'das-page-copy',
    type: 'document',
    title: 'DAS Page Copy',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "das-page-copy" }),
        {
            name: 'page',
            type: 'string',
            title: 'Page Key'
        },
        {
            name: 'key',
            type: 'string',
            title: 'Copy Key'
        },
        {
            name: 'copy',
            type: 'text',
            title: 'Text'
        }
    ],
    preview: {
        select: {
            title: "page",
            subtitle: "key"
        },
    },
}

