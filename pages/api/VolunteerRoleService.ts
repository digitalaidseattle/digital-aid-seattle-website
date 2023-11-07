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
      //TODO: Finish handling of 'key technologies' field. Currently this field is returned as an array of records. Working with Seamus to establish his aims here.
      
      const volunteerRoleData = {
        role: record.fields?.Role ?? null,
        key: record.fields.Key ?? null,
        location: record.fields?.Location ?? null,
        duration: record.fields?.Duration ?? null,
        headline: record.fields?.Headline ?? null,
        description: record.fields?.Description ?? null,
        whyJoin: record.fields?.['Why Join Us'] ?? null,
        aboutUs: record.fields?.['About Us'] ?? null,
        responsibilities:
          typeof record.fields?.Responsibilities === 'string'
            ? record.fields?.Responsibilities.split('\n')
            : null,
        preferredQualifications:
          typeof record.fields?.['Preferred Qualifications'] === 'string'
            ? record.fields?.['Preferred Qualifications'].split('\n')
            : null,
        keyTechnologies:
          typeof record.fields?.['Key technologies'] === 'string'
            ? record.fields?.['Key technologies'].split('\n')
            : null,
        venture: record.fields?.['Venture (from Partner Needs Link)'] ?? null,
        applicationLink: record.fields?.['url to apply'] ?? null,
        urgency: record.fields?.Urgency ?? null,
        image: {
          filename: record.fields?.image[0]?.filename,
          url: record.fields?.image[0]?.url,
          width: record.fields?.image[0]?.width,
          height: record.fields?.image[0]?.height,
        },
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
