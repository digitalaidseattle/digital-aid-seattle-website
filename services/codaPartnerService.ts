/**
 *  codaPartnerService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { Entity } from '@digitalaidseattle/core';
import { CodaRow, CodaService } from './codaService';

type Partner = Entity & {
    _createdAt: Date,
    name: string,
    role: string,
    url: string
}

const CODA_DOC_ID = "r6VtSC7MPA";
const TABLE_ID = 'grid-qFnhGRfW7C';

function coda2Entity(row: CodaRow): Partner {
    console.log('Partner', row)

    const entity = {

    } as Partner;
    return entity;
}

class CodaPartnerService extends CodaService<Partner> {

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
}

export { CodaPartnerService };

