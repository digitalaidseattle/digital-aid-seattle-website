/*
* @2023 Digital Aid Seattle
*/

import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/lib/client';
import { OSEvent } from 'types';

// Who knows, maybe we replace this with Airtable
class EventsService {

    getTimeString = (event: OSEvent): string => {
        return event.start + (event.end ? ' - ' + event.end : '');
    }

    async getActiveEvents(): Promise<OSEvent[]> {
        return sanityClient()
            .fetch(groq`*[_type == "os-event" && active == true]`);
    }


    async getOne(id: string): Promise<OSEvent> {
        return sanityClient()
            .fetch(groq`*[_type == "os-event" && id == "${id}"]`)
            .then(results => results[0]);
    }
}

const eventsService = new EventsService();

export { eventsService };
