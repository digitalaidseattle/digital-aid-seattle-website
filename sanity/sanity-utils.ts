import { createClient, groq } from "next-sanity";

type TeamMember = {
    _id: string,
    _createdAt: Date,
    name: string
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const client = createClient({
        projectId: "7nfqvjpz",
        dataset: "production",
        apiVersion: "2023-08-13",
    })
    return client.fetch(groq`*[_type == "team-member"]{
        _id,
        _createdAt,
        name,
    }`)
}