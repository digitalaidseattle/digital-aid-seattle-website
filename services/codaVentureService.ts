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
    const venture = {
        id: row.id,
        title: row.values['Ventures'] ? row.values['Ventures'].replaceAll('```', '') : '',
        status: row.values['Venture Status'] ? row.values['Venture Status'].replaceAll('```', '') : '',
        imageSrc: row.values['Ventures Icon'] ? row.values['Ventures Icon'][0].url : '',
        currentTeam: (row.values['Squad Members'] ?? [])
            .map((member: any) => {
                return {
                    name: member['name'] ?? '',
                    // TODO integrate with voulteer service to get image
                    // TODO integrate with role service to get role
                } as TeamMember;
            }),
        // partner: row.values['partner'] || '',
        // painpoint: row.values['painpoint'] || '',
        // programAreas: row.values['programAreas'] ? (row.values['programAreas'] as string).split(',').map(s => s.trim()) : [],
        // description: row.values['description'] || '',
        // projectLink: row.values['projectLink'] || '',
        // problem: row.values['problem'] || '',
        // solution: row.values['solution'] || '',
        // impact: row.values['impact'] || '',
        // display: row.values['display'] || false,
        // imageSrc: row.values['imageSrc'] || '',
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

