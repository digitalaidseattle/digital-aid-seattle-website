import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Text with Illustration',
  name: 'textWithIllustration',
  type: 'object',
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
    }),
    defineField({
      title: 'Tagline',
      name: 'tagline',
      type: 'string',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
    }),
    defineField({
      title: 'Flip Layout',
      name: 'flipLayout',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          title: 'Alternative Text',
          name: 'alt',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'link',
      type: 'selectableLink',
      title: 'Link',
    }),
  ],
})
