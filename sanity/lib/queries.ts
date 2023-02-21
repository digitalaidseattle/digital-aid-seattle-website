import { groq } from 'next-sanity'

export const pagePaths = groq`
  *[_type match "*Page" && slug.current != null].slug.current
`

export const pagesBySlugQuery = groq`
  *[_type match "*Page" && slug.current == $slug][0]
`
