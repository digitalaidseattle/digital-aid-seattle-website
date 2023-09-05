import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, projectId } from './env'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId,
    dataset,
    apiVersion
})

export async function getTeamMembers(): Promise<TeamMember[]> {
    return client.fetch(groq`*[_type == "team-member"]|order(orderRank)`)
}

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
  return builder.image(source)
}