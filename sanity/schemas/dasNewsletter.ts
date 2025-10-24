/*
* dasNewsletter.ts
* @2024 Digital Aid Seattle
*/
import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: 'das-newsletter',
  title: 'Newsletter',
  orderings: [orderRankOrdering],
  type: 'document',
  fields: [
    orderRankField({ type: "das-newsletter" }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File (PDF)',
      type: 'file',
      description: 'Optional full content of the newsletter',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show or hide this newsletter',
    }),
  ],
})
