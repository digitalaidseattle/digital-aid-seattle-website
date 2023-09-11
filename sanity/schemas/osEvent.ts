import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: 'os-event',
    type: 'document',
    title: 'OS Event',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "os-event" }),
      {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'date',
            type: 'string',
            title: 'Date'
        },
        {
            name: 'start',
            type: 'string',
            title: 'Start'
        },
        {
            name: 'end',
            type: 'string',
            title: 'End'
        },
        {
            name: 'location',
            type: 'string',
            title: 'Location'
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string'
                }
            ]
        }        ,
        {
            name: 'rsvpLink',
            type: 'string',
            title: 'RSVP Link'
        }
    ]
} 