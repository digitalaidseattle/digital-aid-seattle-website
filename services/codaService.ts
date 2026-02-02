/**
 *  codaService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { Entity, EntityService, Identifier, User } from "@digitalaidseattle/core";

const CODA_API_TOKEN = process.env.NEXT_PUBLIC_CODA_API_TOKEN;
const CODA_API_BASE = `https://coda.io/apis/v1/docs`;

type CodaRow = {
    id: string;
    values: Record<string, any>;
}

abstract class CodaService<T extends Entity> implements EntityService<T> {
    documentId = '';
    tableName = '';
    select = '*';
    mapper = (json: any) => (json as T);
    entityToCodaMapper = (_entity: T) => ({} as any);

    constructor(documentId: string, tableName: string, select?: string, mapper?: (json: any) => T, entityToCodaMapper?: (_entity: T) => {}) {
        this.tableName = tableName;
        this.documentId = documentId ?? this.documentId;
        this.select = select ?? '*';
        this.mapper = mapper ?? ((json: any) => json);
        this.entityToCodaMapper = entityToCodaMapper ?? ((_entity: any) => ({} as any));
    }

    /* 
     * Get a single row by ID
     * Copying the pattern from AirtableService.ts and adapting to Coda API
     * using getall as a reference
     * @returns the row or null if not found
     * @ param _id the ID of the row to get
     * @ param _select optional select string to override default (ignored)
     * @ param _mapper optional mapper function to override default
    */
    async getById(_id: Identifier, _select?: string, _mapper?: ((json: any) => T) | undefined): Promise<T | null> {
        if (!_id) return null;

        // Prepare query parameters
        const params = new URLSearchParams({
            // Coda uses useColumnNames to return column names instead of IDs
            useColumnNames: "true",
            // valueFormat rich returns formatted values
            valueFormat: "rich"
        });

        // This gets ignored but good for backwards compatibility
        const select = _select ?? this.select;
        if (select) {
            params.set('select', select);
        }

        // Fetch the row from Coda API
        const url = `${CODA_API_BASE}/${this.documentId}/tables/${this.tableName}/rows/${_id}?${params.toString()}`;
        const resp = await fetch(encodeURI(url), {
            headers: { Authorization: `Bearer ${CODA_API_TOKEN}` },
        });

        // Check for not found
        if (resp.status === 404) return null;
        if (!resp.ok) {
            const error = await resp.json().catch(() => ({ message: resp.statusText }));
            throw new Error(`Failed to fetch row: ${error.message || resp.statusText}`);
        }

        // Parse and map the result
        const data = await resp.json();
        const mapper = _mapper ?? this.mapper;
        return mapper(data);
    }

    /*
     * Insert a single row into the configured Coda table.
     * @param _entity The entity object to insert (mapped to Coda row format).
     * @param _select Optional select string to influence returned fields (passed through to `getById`).
     * @param _mapper Optional mapper function to transform the returned JSON into a T.
     * @param _user Optional user performing the insert (currently unused).
     * @returns The newly created entity (mapped via `_mapper` or the service mapper) or `null` if the create did not return an ID.
     * @throws On non-202/non-ok responses with a message from the Coda API.
     */
    async insert(_entity: T, _select?: string, _mapper?: ((json: any) => T) | undefined, _user?: User): Promise<T | null> {
        // get rows to insert
        const rows = [this.entityToCodaMapper(_entity)];
        
        // make the request to Coda API
        const resp = await fetch(`${CODA_API_BASE}/${this.documentId}/tables/${this.tableName}/rows`, {
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
            throw new Error(`Failed to create row: ${error.message || resp.statusText}`);
        }

        // Parse the response to get the added row ID
        const data = await resp.json();
        const addedId = data.addedRowIds?.[0];
        
        // If no ID returned, return null
        if (!addedId) return null;
        
        // Fetch and return the newly created row using our new getById method!
        return this.getById(addedId, _select, _mapper);
    }


    /*
     * Update an existing row by ID.
     * @param _id The ID of the row to update.
     * @param _changes Partial entity with updates to apply.
     * @param _select Optional select string to pass to `getById` when returning the updated row.
     * @param _mapper Optional mapper to override the default mapper used for the returned row.
     * @param _user Optional user performing the update (currently unused).
     * @returns The updated entity or `null` if not found.
     * @throws On non-ok non-404 responses containing the Coda API error message.
     */
    async update(_id: Identifier, _changes: Partial<T>, _select?: string, _mapper?: ((json: any) => T) | undefined, _user?: User): Promise<T | null> {
        if (!_id) return null;

        // Map the incoming changes to the Coda row format using the entity mapper.
        const row = this.entityToCodaMapper(_changes as T);

        const resp = await fetch(`${CODA_API_BASE}/${this.documentId}/tables/${this.tableName}/rows/${_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${CODA_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ row })
        });

        // Not found
        if (resp.status === 404) return null;

        if (!resp.ok) {
            const error = await resp.json().catch(() => ({ message: resp.statusText }));
            throw new Error(`Failed to update row: ${error.message || resp.statusText}`);
        }

        // Fetch and return the updated row using our existing getById for consistency
        return this.getById(_id, _select, _mapper);
    }

    /*
    * Delete a row by ID.
    * @param _id The ID of the row to delete.
    * @param _user Optional user performing the deletion (currently unused).
    * @returns Promise that resolves when deletion is complete.
    * @throws On non-ok non-404 responses containing the Coda API error message.
    */
    async delete(_id: Identifier, _user?: User): Promise<void> {
        if (!_id) return;

        const resp = await fetch(`${CODA_API_BASE}/${this.documentId}/tables/${this.tableName}/rows/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${CODA_API_TOKEN}`,
            },
        });

        // If the row wasn't found, treat as no-op
        if (resp.status === 404) return;

        if (!resp.ok) {
            const error = await resp.json().catch(() => ({ message: resp.statusText }));
            throw new Error(`Failed to delete row: ${error.message || resp.statusText}`);
        }

        return;
    }

    async getAll(_count?: number, _select?: string, _mapper?: (json: any) => T): Promise<T[]> {

        let rows: any[] = [];
        let pageToken: string | undefined = undefined;

        do {
            const params = new URLSearchParams({
                limit: "200",
                useColumnNames: "true",
                valueFormat: "rich"
            });

            if (pageToken) {
                params.set("pageToken", pageToken);
            }

            const res = await fetch(
                `https://coda.io/apis/v1/docs/${this.documentId}/tables/${this.tableName}/rows?${params}`,
                {
                    headers: {
                        Authorization: `Bearer ${CODA_API_TOKEN}`,
                    },
                }
            );

            const data = await res.json();
            rows.push(...data.items.map((json: any) => this.mapper(json)));
            pageToken = data.nextPageToken;
        } while (pageToken);

        return rows;
    }

    async batchInsert(entities: T[], _select?: string, _mapper?: (json: any) => T, _user?: User): Promise<T[]> {
        // }
        // async createRows(tableId: string, rows: { cells: { column: string, value: any }[] }[]): Promise<any> {
        const rows = entities.map(entity => this.entityToCodaMapper(entity));

        const resp = await fetch(`${CODA_API_BASE}/${this.documentId}/tables/${this.tableName}/rows`, {
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
        const params = new URLSearchParams({
            limit: "200",
            useColumnNames: "true",
            valueFormat: "rich"
        });
        const url = `${CODA_API_BASE}/${this.documentId}/tables/${this.tableName}/rows?query=${column}:"${name}"&${params}`;
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

