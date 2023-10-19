/*
* @2023 Digital Aid Seattle
*/

import Airtable from 'airtable'

// Documentation: Airtable provides an excellent guide to using their API.
// To access documentation for our unique base, visit: https://airtable.com/{{baseID}}/api/docs#javascript/table:roles
// To find the baseID, visit any page in the Digital Aid Airtable base and look at the URL. 
// It will be the string of characters after the first slash, starting with "app".

class DASVolunteerRoleService {
    
    airtable = new Airtable({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
    })
    base = this.airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID_DAS)
    volunteerRolesTable = this.base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_VOLUNTEER_ROLES)
    
    getVolunteerRoles() {
        return new Promise((resolve, reject) => {
            this.volunteerRolesTable.select({
                view: "Grid view"
            })
            .all()
            .then((records) => {
                const activeRoles = records.filter((record) => {
                    return record.get('Status') === 'Active'
                })
                const volunteerRolesData = activeRoles.map((record) => {
                    
                    return {
                        id: record.id,
                        role: record.fields.Role,
                        description: record.fields.Description,
                        applicationLink: record.fields['url to apply'],
                        image: {
                            filename: record.fields.image[0].filename,
                            url: record.fields.image[0].url,
                            width: record.fields.image[0].width,
                            height: record.fields.image[0].height,
                        }
                    }
                })
                resolve(volunteerRolesData)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

const dasVolunteerRoleService = new DASVolunteerRoleService();

export { dasVolunteerRoleService };

