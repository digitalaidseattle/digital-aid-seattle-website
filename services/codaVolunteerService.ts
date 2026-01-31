/**
 *  proctorService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { Entity } from '@digitalaidseattle/core';
import { CodaRow, CodaService } from './codaService';
import { TeamMember } from 'types';

type Volunteer = Entity & {
    _createdAt: Date,
    name: string,
    role: string,
    status: string[],
    url: string,
    cadreContributor: string[],
}

const CODA_DOC_ID = "24QYb2RP0g";
const TABLE_ID = 'grid-4vzF6VuaPV';

function coda2Entity(row: CodaRow): Volunteer {
    const entity = {
        id: row.id,
        name: row.values['Name'] ? row.values['Name'].replaceAll('```', '') : '',
        role: row.values['Position'] ? row.values['Position'].replaceAll('```', '') : '',
        url: row.values['Pic'] ? row.values['Pic'][0].url : '',
        cadreContributor: row.values['Cadre or Contributor'] ? row.values['Cadre or Contributor'].map((s: any) => s.replaceAll('```', '')) : [],
        status: row.values['Status'] ? row.values['Status'].map((s: any) => s.replaceAll('```', '')) : [],
    } as Volunteer;
    return entity;
}

class CodaVolunteerService extends CodaService<Volunteer> {

    static instance: CodaVolunteerService;
    static getInstance(): CodaVolunteerService {
        if (!CodaVolunteerService.instance) {
            CodaVolunteerService.instance = new CodaVolunteerService();
        }
        return CodaVolunteerService.instance;
    }

    constructor() {
        super(CODA_DOC_ID, TABLE_ID, undefined, coda2Entity, undefined);
    }

    getPeople(cadreOrContributor: string): Promise<TeamMember[]> {
        return this.getAll()
            .then(volunteers => {
                return volunteers
                    .filter(v => v.status.includes('Active'))
                    .filter(v => v.cadreContributor.includes(cadreOrContributor))
                    .map(v => {
                        return {
                            name: v.name,
                            role: v.role,
                            url: v.url
                        } as TeamMember;
                    })
            })
            .catch(error => {
                console.error('Error fetching volunteers from Coda:', error);
                return [];
            });
    }
}

export { CodaVolunteerService };

