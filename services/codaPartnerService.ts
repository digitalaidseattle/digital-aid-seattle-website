/**
 *  codaPartnerService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { CodaRow, CodaService } from './codaService';
import { DASPartner } from 'types';


const CODA_DOC_ID = "r6VtSC7MPA";
const TABLE_ID = 'grid-qFnhGRfW7C';

function coda2Entity(row: CodaRow): DASPartner {
    const entity = {
        name: CodaService.removeBackTicks(row.values['Org Name']),
        foci: CodaService.normalizeToArray(row.values['Foci']).map((focus: string) => CodaService.removeBackTicks(focus)),
        description: CodaService.removeBackTicks(row.values['Org description']),
    } as DASPartner;
    return entity;
}

class CodaPartnerService extends CodaService<DASPartner> {

    static instance: CodaPartnerService;
    static getInstance(): CodaPartnerService {
        if (!CodaPartnerService.instance) {
            CodaPartnerService.instance = new CodaPartnerService();
        }
        return CodaPartnerService.instance;
    }

    constructor() {
        super(CODA_DOC_ID, TABLE_ID, undefined, coda2Entity, undefined);
    }

    async findPartners(): Promise<DASPartner[]> {
        return this.findBy('Type', 'Partner');
    }
}

export { CodaPartnerService };

