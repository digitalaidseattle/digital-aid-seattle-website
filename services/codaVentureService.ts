/**
 *  proctorService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { DASProject, TeamMember } from 'types';
import { CodaRow, CodaService } from './codaService';

const CODA_DOC_ID = "24QYb2RP0g";
const VENTURE_TABLE_ID = 'grid-UdXLv7wwqh';

function coda2Entity(row: CodaRow): DASProject {
    console.log(row)
    // HACK
    // Coda should return proper names.
    const title = CodaService.removeBackTicks(row.values['Ventures']);
    const partner = title.split('-')[0]
    // END HACK
    const venture = {
        id: row.id,
        title: title,
        status: CodaService.removeBackTicks(row.values['Venture Status']),
        imageSrc: row.values['Ventures Icon'] ? row.values['Ventures Icon'][0].url : '',
        currentTeam: (row.values['Squad Members'] ?? [])
            .map((member: any) => {
                return {
                    name: member['name'] ?? '',
                    // TODO integrate with voulteer service to get image
                    // TODO integrate with role service to get role
                } as TeamMember;
            }),
        partner: partner,
        painpoint: "",   //  The data is too long, should be a short description of problem.  CodaService.removeBackTicks(row.values['Details']),
        programAreas: [], // Get for partner?
        // description: row.values['description'] || '',
        projectLink: `project/${row.id}`,
        problem: CodaService.removeBackTicks(row.values['Problem']),
        solution: CodaService.removeBackTicks(row.values['Solution']),
        impact: CodaService.removeBackTicks(row.values['Impact']),
        // display: row.values['display'] || false,
        // ventureCode: row.values['ventureCode'] || ''
    } as DASProject;
    return venture;
}

class CodaVentureService extends CodaService<DASProject> {

    static instance: CodaVentureService;
    static getInstance(): CodaVentureService {
        if (!CodaVentureService.instance) {
            CodaVentureService.instance = new CodaVentureService();
        }
        return CodaVentureService.instance;
    }

    constructor() {
        super(CODA_DOC_ID, VENTURE_TABLE_ID, undefined, coda2Entity, undefined);
    }
}

export { CodaVentureService };

