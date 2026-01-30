/**
 *  proctorService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { CodaRow, CodaService } from './codaService';

type Venture = {
    _id: string
    _createdAt: Date
    orderRank: string
    id: string
    title: string
    partner: string
    painpoint: string
    programAreas: string[]
    description: string
    status: "Submitted by Partner"
    | "Ready for consideration"
    | "Active"
    | "Under evaluation"
    | "Declined"
    | "Completed"
    projectLink: string
    duration?: { start: string; end: string }
    problem: string
    solution: string
    impact: string
    display: boolean,
    imageSrc: string,
    ventureCode: string
}
// @ts-ignore - Environment variables are defined at runtime
const VENTURE_TABLE_ID = 'grid-UdXLv7wwqh';

function coda2Entity(row: CodaRow): Venture {
    console.log(row)

    const venture = {
        title: row.values['c-VmSQh523FY'] || '',
        status: row.values['c-GuJCl9qMyY'],

        partner: row.values['partner'] || '',
        painpoint: row.values['painpoint'] || '',
        programAreas: row.values['programAreas'] ? (row.values['programAreas'] as string).split(',').map(s => s.trim()) : [],
        description: row.values['description'] || '',
        projectLink: row.values['projectLink'] || '',
        problem: row.values['problem'] || '',
        solution: row.values['solution'] || '',
        impact: row.values['impact'] || '',
        display: row.values['display'] || false,
        imageSrc: row.values['imageSrc'] || '',
        ventureCode: row.values['ventureCode'] || ''
    } as Venture;
    return venture;
}

class CodaVentureService extends CodaService<Venture> {

    static instance: CodaVentureService;
    static getInstance(): CodaVentureService {
        if (!CodaVentureService.instance) {
            CodaVentureService.instance = new CodaVentureService();
        }
        return CodaVentureService.instance;
    }

    constructor() {
        super(VENTURE_TABLE_ID, undefined, coda2Entity, undefined);
    }
}

export { CodaVentureService };

