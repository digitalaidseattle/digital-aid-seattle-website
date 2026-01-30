/**
 *  codaService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { Entity, EntityService, Identifier, User } from "@digitalaidseattle/core";

const CODA_API_TOKEN = process.env.NEXT_PUBLIC_CODA_API_TOKEN;
const CODA_DOC_ID = "24QYb2RP0g";
const CODA_API_BASE = `https://coda.io/apis/v1/docs/${CODA_DOC_ID}`;

type CodaRow = {
    id: string;
    values: Record<string, any>;
}

abstract class CodaService<T extends Entity> implements EntityService<T> {
    tableName = '';
    select = '*';
    mapper = (json: any) => (json as T);
    entityToCodaMapper = (_entity: T) => ({} as any);

    constructor(tableName: string, select?: string, mapper?: (json: any) => T, entityToCodaMapper?: (_entity: T) => {}) {
        this.tableName = tableName;
        this.select = select ?? '*';
        this.mapper = mapper ?? ((json: any) => json);
        this.entityToCodaMapper = entityToCodaMapper ?? ((_entity: any) => ({} as any));
    }

    getById(_id: Identifier, _select?: string, _mapper?: ((json: any) => T) | undefined): Promise<T | null> {
        throw new Error("Method not implemented.");
    }

    insert(_entity: T, _select?: string, _mapper?: ((json: any) => T) | undefined, _user?: User): Promise<T> {
        throw new Error("Method not implemented.");
    }

    update(_id: Identifier, _changes: Partial<T>, _select?: string, _mapper?: ((json: any) => T) | undefined, _user?: User): Promise<T> {
        throw new Error("Method not implemented.");
    }

    delete(_id: Identifier, _user?: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getAll(_count?: number, _select?: string, _mapper?: (json: any) => T): Promise<T[]> {
        const url = `${CODA_API_BASE}/tables/${this.tableName}/rows?useColumnNames=true&valueFormat=rich`;
        const resp = await fetch(url, {
            headers: { 'Authorization': `Bearer ${CODA_API_TOKEN}` }
        });

        if (!resp.ok) {
            const error = await resp.json().catch(() => ({ message: resp.statusText }));
            throw new Error(`Failed to fetch rows: ${error.message || resp.statusText}`);
        }

        const data = await resp.json();
        return data.items.map((json: any) => this.mapper(json))
    }

    async batchInsert(entities: T[], _select?: string, _mapper?: (json: any) => T, _user?: User): Promise<T[]> {
        // }
        // async createRows(tableId: string, rows: { cells: { column: string, value: any }[] }[]): Promise<any> {
        const rows = entities.map(entity => this.entityToCodaMapper(entity));

        const resp = await fetch(`${CODA_API_BASE}/tables/${this.tableName}/rows`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CODA_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rows })
        });

        // Coda API returns 202 Accepted for async processing
        if (resp.status !== 202 && !resp.ok) {
            const error = await resp.json()
                .catch(() => ({ message: resp.statusText }));
            throw new Error(`Failed to create rows: ${error.message || resp.statusText}`);
        }

        // Return the response (202 Accepted means the request was queued successfully)
        return resp.json()
            .then(data => {
                console.log(data)
                // TODO look up rows
                return data.addedRowIds.map((id: string) => ({ id: id }))
            })

    }

    async findBy(column: string, name: string): Promise<T[]> {
        const url = `${CODA_API_BASE}/tables/${this.tableName}/rows?query=${column}:"${name}"`;
        console.log(url)
        const resp = await fetch(encodeURI(url), {
            headers: { 'Authorization': `Bearer ${CODA_API_TOKEN}` }
        });

        if (!resp.ok) {
            const error = await resp.json().catch(() => ({ message: resp.statusText }));
            throw new Error(`Failed to fetch rows: ${error.message || resp.statusText}`);
        }

        const data = await resp.json();
        return data.items.map((json: any) => this.mapper(json))
    }
}

export { CodaService };
export type { CodaRow }

