/*
* @2023 Open Seattle
*/

import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/lib/client';
import { OSEvent } from 'types';


class OSEventService {
    eventsQuery = groq`*[_type == "os-event"]`

    async getActiveEvents(): Promise<OSEvent[]> {
        return sanityClient().fetch(this.eventsQuery);
    }

}

const osEventsService = new OSEventService();

export { osEventsService };
