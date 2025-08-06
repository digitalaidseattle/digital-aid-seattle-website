import { DASNewsletter } from 'types'
import { sanityClient } from '../sanity/lib/client'
import { groq } from 'next-sanity'

export async function fetchNewsletters(): Promise<DASNewsletter[]> {
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
