import { sanityClient } from '../sanity/lib/client'
import { groq } from 'next-sanity'

export interface Newsletter {
  _id: string
  title: string
  date: string
  description: string
  image: string
  blob?: any
  active?: boolean
}

export async function fetchNewsletters(): Promise<Newsletter[]> {
  return await sanityClient()
    .fetch(groq`*[_type == "newsletter" && active == true] | order(date desc) {
    _id,
    title,
    date,
    description,
    image,
    blob,
    active
  }`)
}
