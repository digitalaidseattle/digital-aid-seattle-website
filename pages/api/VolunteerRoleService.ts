/*
 * @2023 Digital Aid Seattle
 */

import { DASVolunteerRole, DASVolunteerRoleBasicInfo } from 'types'

import airtableService from './AirtableService'
import Airtable, { FieldSet } from 'airtable'

// Documentation: Airtable provides an excellent guide to using their API.
// To access documentation for our unique base, visit: https://airtable.com/{{baseID}}/api/docs#javascript/table:roles
// To find the baseID, visit any page in the Digital Aid Airtable base and look at the URL.
// It will be the string of characters after the first slash, starting with "app".


class DASVolunteerRoleService {

  async getAllActiveRoles(): Promise<DASVolunteerRoleBasicInfo[]> {
    const volunteerRolesTable =
      process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES!
    const maxRecords = 100
    const activeRoleFilter = '{Status} = "Active"'

    const { getStringFieldRecord, getStringArrayFieldRecord } = airtableService

    const activeRoles = await airtableService.getTableRecords(
      volunteerRolesTable,
      maxRecords,
      activeRoleFilter
    ) as any[];

    activeRoles.sort((a, b) => {
      return a.fields.Role.localeCompare(b.fields.Role)
    })

    const volunteerRolesData = activeRoles.map((record) => {
      return {
        id: record.id,
        role: getStringFieldRecord(record, 'Role'),
        key: getStringFieldRecord(record, 'Key'),
        category: getStringArrayFieldRecord(record, 'Category'),
      } as DASVolunteerRoleBasicInfo
    })
    return volunteerRolesData
  }

  async getRoleDetailsByName(
    roleKey: string
  ): Promise<DASVolunteerRole | null> {
    const volunteerRolesTable =
      process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES!
    const maxRecords = 1
    const filterByFormula = `{Key} = '${roleKey}'`

    return airtableService
      .getTableRecords(
        volunteerRolesTable, maxRecords, filterByFormula
      ).then(records => records.length === 0
        ? null
        : this.transformRecord(records[0])
      )
  }

  transformRecord(record: Airtable.Record<FieldSet>): DASVolunteerRole {
    return {
      role: airtableService.getStringFieldRecord(record, 'Role'),
      key: airtableService.getStringFieldRecord(record, 'Key'),
      category: airtableService.getStringArrayFieldRecord(record, 'Category'),
      location: airtableService.getStringFieldRecord(record, 'Location'),
      duration: airtableService.getStringFieldRecord(record, 'Duration'),
      headline: airtableService.getStringFieldRecord(record, 'Headline'),
      description: airtableService.getStringFieldRecord(record, 'Description'),
      whyJoin: airtableService.getStringFieldRecord(record, 'Why Join Us'),
      aboutUs: airtableService.getStringFieldRecord(record, 'About Us'),
      responsibilities: airtableService.getStringFieldRecord(record, 'Responsibilities'),
      preferredQualifications: airtableService.getStringFieldRecord(record, 'Preferred Qualifications'),
      keyAttributesToSuccess: airtableService.getStringFieldRecord(record, 'Key attributes for success'),
      venture: airtableService.getStringFieldRecord(record, 'Venture (from Partner Needs Link)'),
      applicationLink: airtableService.getStringFieldRecord(record, 'url to apply'),
      urgency: airtableService.getNumberFieldRecord(record, 'Urgency'),
      keyTechnologiesIds: airtableService.getStringArrayFieldRecord(record, 'Key technologies')
    } as DASVolunteerRole
  }

  async getAndGroupTechnologies(roleTechnologyRecordIds: string[]) {
    if (roleTechnologyRecordIds && Array.isArray(roleTechnologyRecordIds)) {
      const keyTechnologiesData = await airtableService.getTableRecords(
        process.env.NEXT_PUBLIC_AIRTABLE_TABLE_TOOLS_WE_USE!
      )
      const roleTechnologies = keyTechnologiesData.filter((tech) => {
        return roleTechnologyRecordIds.includes(tech.id)
      })
      const technologiesMap = new Map()
      roleTechnologies.forEach((tech) => {
        const category = tech.fields?.Category || 'Other'
        const name = tech.fields?.['Name']
        if (!technologiesMap.has(category)) {
          technologiesMap.set(category, [])
        }
        technologiesMap.get(category).push(name)
      })
      let keyTechnologies: string[] = [];
      technologiesMap.forEach((value, key) => {
        keyTechnologies.push(`${key}: ${value.join(', ')}`)
      })
      keyTechnologies = keyTechnologies.sort((a, b) => {
        if (a.startsWith('Other')) {
          return 1
        } else if (b.startsWith('Other')) {
          return -1
        } else {
          return a.localeCompare(b)
        }
      })
      return keyTechnologies.map(k => "- " + k).join('\n')
    } else {
      return null
    }
  }
}

const dasVolunteerRoleService = new DASVolunteerRoleService()

export { dasVolunteerRoleService }