/**
 *  proctorService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { TeamMember, Volunteer } from 'types';
import { CodaRow, CodaService } from './codaService';


const CODA_DOC_ID = "24QYb2RP0g";
const TABLE_ID = 'grid-4vzF6VuaPV';

// Coda returns the 'Linkedin URL' column as a rich WebPage object ({ url }) or a
// plain string. Normalize to a URL string, adding a scheme when one is missing.
function extractLinkedInUrl(value: any): string {
    if (!value) return ''
    const raw = (typeof value === 'string' ? value : value.url ?? '').replaceAll('```', '').trim()
    if (!raw) return ''
    return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
}

function coda2Entity(row: CodaRow): Volunteer {
    try {
        const entity = {
            id: row.id,
            name: CodaService.removeBackTicks(row.values['Name']),
            role: row.values['Position'] ? row.values['Position'].replaceAll('```', '') : '',
            url: (row.values['Pic'] && row.values['Pic'].length > 0) ? row.values['Pic'][0].url : '',
            cadreContributor: row.values['Cadre or Contributor'] ? row.values['Cadre or Contributor'].map((s: any) => s.replaceAll('```', '')) : [],
            status: CodaService.removeBackTicks(row.values['Status']),
            linkedIn: extractLinkedInUrl(row.values['Linkedin URL']),
            showLinkedIn: row.values['Show My LinkedIn on DAS Website'] !== false, // Unticked checkbox is an opt-out; a missing column defaults to showing it
        } as Volunteer;
        return entity;

    } catch (err) {
        console.log(row)
        throw err
    }
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

    async getPeople(cadreOrContributor: string): Promise<TeamMember[]> {
        return this.findBy('Status', 'Active')
            .then(volunteers => {
                return volunteers
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

