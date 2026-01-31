/**
 *  codaRoleService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { DASVolunteerRole, DASVolunteerRoleBasicInfo } from 'types';
import { CodaRow, CodaService } from './codaService';

type Role = DASVolunteerRole & {
    status: string;
}

const CODA_DOC_ID = "24QYb2RP0g";
const TABLE_ID = 'grid-YIZ0HWUd3o';

function coda2Entity(row: CodaRow): Role {
    const entity = {
        id: row.id,
        key: row.values['Key'] ? row.values['Key'].replaceAll('```', '') : '',
        role: row.values['Role'] ? row.values['Role'].replaceAll('```', '') : '',
        url: row.values['Pic'] ? row.values['Pic'][0].url : '',
        keyTechnologies: row.values['Category'] ? row.values['Category'].map((s: any) => s.name) : [],
        category: row.values['Category'] ? row.values['Category'].map((s: any) => s.name) : [],
        status: row.values['Status'] ? row.values['Status'].replaceAll('```', '') : '',
        location: row.values['Location'] ? row.values['Location'].replaceAll('```', '') : '',
        duration: row.values['Duration'] ? row.values['Duration'].replaceAll('```', '') : '',
        headline: row.values['Headline'] ? row.values['Headline'].replaceAll('```', '') : '',
        description: row.values['Description'] ? row.values['Description'].replaceAll('```', '') : '',
        aboutUs: row.values['About Us'] ? row.values['About Us'].replaceAll('```', '') : '',
        responsibilities: row.values['Responsibilities'] ? row.values['Responsibilities'].replaceAll('```', '') : '',
        preferredQualifications: row.values['Preferred Qualifications'] ? row.values['Preferred Qualifications'].replaceAll('```', '') : '',
        keyAttributesToSuccess: row.values['Key attributes for success'] ? row.values['Key attributes for success'].replaceAll('```', '') : '',
        whyJoin: row.values['Why Join'] ? row.values['Why Join'].replaceAll('```', '') : '',
    } as Role;
    return entity;
}

class CodaRoleService extends CodaService<Role> {

    static instance: CodaRoleService;
    static getInstance(): CodaRoleService {
        if (!CodaRoleService.instance) {
            CodaRoleService.instance = new CodaRoleService();
        }
        return CodaRoleService.instance;
    }

    constructor() {
        super(CODA_DOC_ID, TABLE_ID, undefined, coda2Entity, undefined);
    }

    getAllActiveRoles(): Promise<DASVolunteerRoleBasicInfo[]> {
        return this.getAll()
            .then(roles => roles.filter(r => r.status === 'Active')
                .map(r => {
                    return {
                        role: r.role,
                        key: r.key,
                        category: r.category
                    } as DASVolunteerRoleBasicInfo;
                })
            );
    }

    getRoleDetailsByName(key: string): Promise<DASVolunteerRole | null> {
        return this.findBy('Key', key)
            .then(roles => roles.length > 0 ? roles[0] : null)
    }

}

export { CodaRoleService };
