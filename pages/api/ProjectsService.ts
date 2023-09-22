/*
* @2023 Digital Aid Seattle
*/

import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/lib/client';
import { DASProject } from 'types';


class DASProjectsService {
    query = groq`*[_type == "das-project"]`
    querySingle = groq`*[_type == "das-project"]`

    async getAll(): Promise<DASProject[]> {
        return sanityClient()
            .fetch(this.query)
    }

    async getOne(id: string): Promise<DASProject> {
        return sanityClient()
            .fetch(groq`*[_type == "das-project" && id == "${id}"]`)
            .then(results => results[0]);
    }

    getTimeline(project: DASProject): string {
        const timeline = project.duration && (project.duration.start || project.duration.end)
            ? `${project.duration.start ? project.duration.start : ''} ${project.duration.end ? (' - ' + project.duration.end) : ''}`
            : 'Ongoing'
        return timeline
    }
}

const dasProjectsService = new DASProjectsService();

export { dasProjectsService };
