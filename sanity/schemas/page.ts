import { defineArrayMember, defineField, defineType } from 'sanity'

import { textWithIllustration } from './textWithIllustration'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({
      title: 'Slots',
      name: 'slots',
      type: 'array',
      of: [defineArrayMember({ type: 'textWithIllustration' })],
    }),
  ],
})
