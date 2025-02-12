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
  status: "Submitted by Partner"
  | "Ready for consideration"
  | "Active"
  | "Under evaluation"
  | "Declined"
  | "Completed"
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

type DASQandA = {
  _id: string
  _createdAt: Date
  question: string
  answer: string
}

type DASFaq = {
  _id: string
  _createdAt: Date
  name: string
  title: string
  description: string
  qandas: DASQandA[]
  orderRank: string
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
  keyTechnologiesIds?: string[]
} & DASVolunteerRoleBasicInfo

type DASTestimonial = {
  _id: string
  _createdAt: Date
  title: string,
  quote: string,
  name: string,
  avatar: Image,
  role: string,
  active: boolean,
  orderRank: string
}

type DASPageCopy = {
  _id: string
  _createdAt: Date
  page: string
  key: string
  copy: string
}