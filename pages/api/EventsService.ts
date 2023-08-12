/*
* @2023 Open Seattle
*/

import EventPlaceholder from '../../assets/event-placeholder.png';
import localEvents from '../../assets/events.json';

class OsEventTime {
    start: string;
    end: string;

    constructor(data: any) {
        this.start = data.start;
        this.end = data.end;
    }
}

class OSEvent {
    title: string;
    date: string;
    time: OsEventTime;
    location: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    buttonLink: string;
    active = true;

    constructor(data: any) {
        this.title = data.title;
        this.date = data.date;
        this.time = new OsEventTime({ start: data.start, end: data.end });
        this.location = data.location;
        this.description = data.description ? data.description : '';
        this.imageSrc = data.imageSrc ? data.imageSrc : EventPlaceholder.src;
        this.imageAlt = data.imageAlt;
        this.buttonLink = data.buttonLink;
    }
}

class OSEventService {

    getActiveEvents(): OSEvent[] {
        // TODO make environment dependent use REST or resource file
        return this.getResourceFile();
    }

    getResourceFile(): OSEvent[] {
        return localEvents.map(json => new OSEvent(json));
    }

}

const osEventsService = new OSEventService();

export { OSEvent, osEventsService,OsEventTime };
