import { defineArrayMember, defineField, defineType } from 'sanity'

import selectableLink from './link'

export default defineType({
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [selectableLink],
      },
    }),
  ],
})
