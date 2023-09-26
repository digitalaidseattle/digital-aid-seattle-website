/*
* @2023 Digital Aid Seattle
*/
import { Image } from 'sanity';

type OSEvent = {
    _id: string,
    _createdAt: Date,
    title: string,
    date: string,
    start: string,
    end: string,
    location: string,
    description: string,
    image: Image,
    rsvpLink: string
}

type TeamMember = {
    _id: string,
    _createdAt: Date,
    name: string,
    role: string,
    image: Image,
}

type DASProject = {
    _id: string,
    _createdAt: Date,
    orderRank: string,
    id: string,
    title: string,
    partner: string,
    programAreas: string[],
    description: string
    status: 'active' | 'recruiting' | 'complete',
    projectLink: string,
    duration?: { start: string; end: string },
    image: Image,
    problem: string[],
    solution: string[],
    impact: string[],
    rolesNeeded: string[],
    currentTeam: TeamMember[],
    display: boolean
}