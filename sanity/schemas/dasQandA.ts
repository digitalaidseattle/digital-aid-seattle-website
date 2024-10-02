/*
* dasQandA.ts
* @2024 Digital Aid Seattle
*/

import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: 'das-qanda',
    type: 'document',
    title: 'DAS Q and A',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "das-qanda" }),
        {
            name: 'question',
            type: 'string',
            title: 'Question'
        },
        {
            name: 'answer',
            type: 'text',
            title: 'Answer'
        }
    ]
}

