/*
 * @2023 Digital Aid Seattle
 */

import Airtable from 'airtable'
import { DASVolunteerRole, DASVolunteerRoleBasicInfo } from 'types'

// Documentation: Airtable provides an excellent guide to using their API.
// To access documentation for our unique base, visit: https://airtable.com/{{baseID}}/api/docs#javascript/table:roles
// To find the baseID, visit any page in the Digital Aid Airtable base and look at the URL.
// It will be the string of characters after the first slash, starting with "app".


class DASVolunteerRoleService {
  private airtable: Airtable
  private base: Airtable.Base
  private volunteerRolesTable: Airtable.Table<Airtable.FieldSet>
  private toolsWeUseTable: Airtable.Table<Airtable.FieldSet>

  constructor(apiKey: string, baseId: string, tableId: string) {
    this.airtable = new Airtable({
      apiKey: apiKey || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    })
    this.base = this.airtable.base(
      baseId || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_DAS
    )
    this.volunteerRolesTable = this.base(
      tableId || process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES
    )
    this.toolsWeUseTable = this.base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_TOOLS_WE_USE)
  }

  async getAllActiveRoles(): Promise<DASVolunteerRoleBasicInfo[]> {
    try {
      const records = await this.volunteerRolesTable
        .select({
          view: 'Grid view',
        })
        .all()

      const activeRoles = records.filter(
        (record) => record.get('Status') === 'Active'
      )

      const volunteerRolesData = activeRoles.map((record) => {
        return {
          id: record.id,
          role: String(record.fields.Role),
          key: String(record.fields.Key),
        }
      })

      return volunteerRolesData
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  async getRoleDetailsByName(
    roleKey: string
  ): Promise<DASVolunteerRole | null> {
    try {
      const recordData = await this.volunteerRolesTable
        .select({
          view: 'Grid view',
          maxRecords: 1,
          filterByFormula: `{Key} = '${roleKey}'`,
        })
        .firstPage()
      if (recordData.length === 0) {
        return null
      }
      const record = recordData[0]

      if (record.fields.Status !== 'Active') {
        return null
      }
      let keyTechnologies = null

      if (record.fields['Key technologies'] && Array.isArray(record.fields['Key technologies'])) {
        const technologiesRecordIds:Array<any> = record.fields['Key technologies']
        try {
          const technologiesData = await this.toolsWeUseTable
            .select({
              view: 'Grid view',
            })
            .all()
          const roleTechnologies = technologiesData.filter((tech) => {
            return technologiesRecordIds.includes(tech.id)
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
          keyTechnologies = []
          technologiesMap.forEach((value, key) => {
            keyTechnologies.push(`${key}: ${value.join(', ')}`)
          })
          keyTechnologies = keyTechnologies.sort((a, b) => {
            if (a.startsWith('Other')) {
              return 1
            } else if (b.startsWith('Other')) {
              return -1
            } else {
            }
          })
        } catch (error) {}
      }
      const volunteerRoleData: DASVolunteerRole = {
        role:
          typeof record.fields.Role === 'string' ? record.fields.Role : null,
        key: typeof record.fields.Key,
        location:
          typeof record.fields?.Location === 'string'
            ? record.fields?.Location
            : null,
        duration:
          typeof record.fields?.Duration === 'string'
            ? record.fields?.Duration
            : null,
        headline:
          typeof record.fields?.Headline === 'string'
            ? record.fields?.Headline
            : null,
        description:
          typeof record.fields?.Description === 'string'
            ? record.fields?.Description
            : null,
        whyJoin:
          typeof record.fields?.['Why Join Us'] === 'string'
            ? record.fields?.['Why Join Us']
            : null,
        aboutUs:
          typeof record.fields?.['About Us'] === 'string'
            ? record.fields?.['About Us']
            : null,
        responsibilities:
          typeof record.fields?.Responsibilities === 'string'
            ? record.fields?.Responsibilities.split('\n')
            : null,
        preferredQualifications:
          typeof record.fields?.['Preferred Qualifications'] === 'string'
            ? record.fields?.['Preferred Qualifications']
            : null,
        keyAttributesToSuccess:
          typeof record.fields?.['Key attributes for success'] === 'string'
            ? record.fields?.['Key attributes for success'].split('\n')
            : null,
        keyTechnologies: keyTechnologies,
        venture:
          typeof record.fields?.['Venture (from Partner Needs Link)'] ===
          'string'
            ? record.fields?.['Venture (from Partner Needs Link)']
            : null,
        applicationLink:
          typeof record.fields?.['url to apply'] === 'string'
            ? record.fields?.['url to apply']
            : null,
        urgency:
          typeof record.fields?.Urgency === 'number'
            ? record.fields?.Urgency
            : null,
      }
      return volunteerRoleData
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_DAS
const tableId = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES

const dasVolunteerRoleService = new DASVolunteerRoleService(
  apiKey,
  baseId,
  tableId
)

export { dasVolunteerRoleService }