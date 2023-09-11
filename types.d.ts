/*
* @2023 Open Seattle
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
    image: string,
}