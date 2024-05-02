/*
* @2023 Digital Aid Seattle
*/
import { Image } from 'sanity';

// map terms used in Airtable to website
//
enum VentureStatus {
  "Submitted by Partner",
  "Ready for consideration",
  "Under evaluation",
  "Active",
  "Declined",
  "Completed"
}

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
  rsvpLink: string,
  active: boolean,
  partner: string,
  id: string,
  about: string,
  activity: Image
}

type TeamMember = {
  _id: string,
  _createdAt: Date,
  name: string,
  role: string,
  image: Image,
  url: string
}

type DASProject = {
  _id: string
  _createdAt: Date
  orderRank: string
  id: string
  title: string
  partner: string
  painpoint: string
  programAreas: string[]
  description: string
  status: VentureStatus
  projectLink: string
  duration?: { start: string; end: string }
  image: Image
  problem: string
  solution: string
  impact: string
  rolesNeeded: DASVolunteerRoleBasicInfo[]
  currentTeam: TeamMember[]
  display: boolean,
  imageSrc: string,
  ventureCode: string
}

type DASFeature = {
  _id: string
  _createdAt: Date
  name: string
  enabled: boolean
}

type DASVolunteerRoleBasicInfo = {
  role: string
  key: string
  category: string[]
}

type DASVolunteerRole = {
  location: string
  duration: string
  headline: string
  description?: string
  whyJoin: string
  aboutUs: string
  responsibilities: string
  preferredQualifications: string
  keyAttributesToSuccess: string
  keyTechnologies?: string
  venture?: string
  applicationLink?: string
  urgency?: number
} & DASVolunteerRoleBasicInfo