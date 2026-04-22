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

    const imageSrc = Array.isArray(row.values['Ventures Icon'])
        ? row.values['Ventures Icon'][0].url
        : (typeof row.values['Ventures Icon'] === 'object')
            ? row.values['Ventures Icon'].url
            : "";

    const venture = {
        id: row.id,
        title: row.name,
        status: CodaService.removeBackTicks(row.values['Venture Status']),
        imageSrc: imageSrc,
        currentTeam: (row.values['Squad Members'] ?? [])
            .map((member: any) => {
                return {
                    name: member['name'] ?? '',
                    // TODO integrate with voulteer service to get image
                    // TODO integrate with role service to get role
                } as TeamMember;
            }),
        description: '', // Getting from partner
        partner: CodaService.removeBackTicks(row.values['Org Name']),
        painpoint: CodaService.removeBackTicks(row.values['Painpoint Shorthand']),  //  The data is too long, should be a short description of problem.  CodaService.removeBackTicks(row.values['Details']),
        programAreas: [], // Getting from partner
        projectLink: `project/${row.id}`,
        problem: CodaService.removeBackTicks(row.values['Problem - Website']),
        solution: CodaService.removeBackTicks(row.values['Solution - Website']),
        impact: CodaService.removeBackTicks(row.values['Impact - Website']),
    } as DASProject;
    return venture;
}

class CodaVentureService extends CodaService<DASProject> {
    static filteredStatuses = ['Active', 'Under evaluation'];

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

