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

    const imageSrc = Array.isArray(row.values['Org Icon - For DAS Website'])
        ? row.values['Org Icon - For DAS Website'][0].url
        : (typeof row.values['Org Icon - For DAS Website'] === 'object')
            ? row.values['Org Icon - For DAS Website'].url
            : "";
    console.log(imageSrc, row.values)
    const venture = {
        id: row.id,
        title: CodaService.removeBackTicks(row.values['Org Name']),
        status: CodaService.removeBackTicks(row.values['Venture Status']),
        imageSrc: imageSrc,
        currentTeam: (row.values['Squad Members'] ?? [])
            .map((member: any) => {
                return {
                    name: member['name'] ?? '',
                } as TeamMember;
            }),
        description: CodaService.removeBackTicks(row.values['Org description']), // Getting from partner
        partner: CodaService.removeBackTicks(row.values['Org Name']),
        painpoint: CodaService.removeBackTicks(row.values['Painpoint Shorthand']),  //  The data is too long, should be a short description of problem.  CodaService.removeBackTicks(row.values['Details']),
        programAreas: CodaService.removeBackTicks(row.values['Foci - For DAS Website']), // Getting from partner
        projectLink: `project/${row.id}`,
        problem: CodaService.removeBackTicks(row.values['Problem - For DAS Website']),
        solution: CodaService.removeBackTicks(row.values['Solution - For DAS Website']),
        impact: CodaService.removeBackTicks(row.values['Impact - For DAS Website']),
    } as DASProject;
    return venture;
}

class CodaVentureService extends CodaService<DASProject> {
    static filteredStatuses = ['Active', 'Under Evaluation'];

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

