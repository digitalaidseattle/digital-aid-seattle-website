import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, projectId } from './env'

export async function getTeamMembers(): Promise<TeamMember[]> {
    const client = createClient({
        projectId,
        dataset,
        apiVersion
    })
    return client.fetch(groq`*[_type == "team-member"]{
        _id,
        _createdAt,
        name,
        role,
        "image": image.asset->url,
    }`)
}