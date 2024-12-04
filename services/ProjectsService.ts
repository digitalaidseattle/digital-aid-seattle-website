/*
* @2024 Digital Aid Seattle
*/

import { groq } from 'next-sanity';
import { DASProject, TeamMember } from 'types';

import { sanityClient } from '../sanity/lib/client';
import airtableService from './AirtableService';
import { FieldSet } from 'airtable';


// No longer used, preserving just in case
function getTimeline(project: DASProject): string {
  const timeline = project.duration && (project.duration.start || project.duration.end)
    ? `${project.duration.start ? project.duration.start : ''} ${project.duration.end ? (' - ' + project.duration.end) : ''}`
    : 'Ongoing'
  return timeline
}

// Cadre page info is stored in Sanity
class SantiyProjectService {

  query = groq`*[_type == "das-project"]`
  querySingle = groq`*[_type == "das-project"]`

  async getAll(): Promise<DASProject[]> {
    return sanityClient()
      .fetch(this.query)
  }

  async getOne(id: string): Promise<DASProject> {
    return sanityClient()
      .fetch(groq`*[_type == "das-project" && id == "${id}"]`)
      .then(results => results[0]);
  }

}

const PARTNER_TABLE = 'tblqttKinLZJ2JXo7';
const VENTURES_TABLE = 'tblRpJek5SjacLaen'; // VENTURE SEEDS/PAINPOINTS TABLE
const VENTURE_ROLES_TABLE = 'tbllAEHFTFX5IZDZL';

class AirtableProjectsService {
  filteredStatuses = ['Active', 'Under evaluation'];

  async airtableTransform(fields: FieldSet): Promise<DASProject> {
    return airtableService.getRecord(PARTNER_TABLE, fields.Partner[0])
      .then(resp => {
        const logos: any[] = resp.fields['logo'] as any[];
        return {
          id: fields['AirTable ID'],
          title: resp.fields['Org name'],
          painpoint: fields['Painpoint Shorthand'],
          status: fields['Status'],
          problem: fields['Problem (for DAS website)'],
          solution: fields['Solution (for DAS website)'],
          impact: fields['Impact (for DAS website)'],
          description: resp.fields['Org description'],
          imageSrc: (logos && logos.length > 0) ? logos[0].url : null,
          programAreas: fields['Foci (from Partner)'],
          projectLink: `project/${fields['AirTable ID']}`,
          ventureCode: fields['Prospective Venture Code']
        } as DASProject
      })

  }

  async getAll(): Promise<DASProject[]> {
    const MAX_RECORDS = 100;
    const FILTER = `OR(${this.filteredStatuses.map(s => `{Status} = "${s}"`).join(", ")})`;
    // const ACTIVE_FILTER = '';
    return await airtableService
      .getTableRecords(VENTURES_TABLE, MAX_RECORDS, FILTER)
      .then(records => Promise.all(records.map(record => this.airtableTransform(record.fields))))
  }

  async getSquad(ventureCode: string): Promise<TeamMember[]> {
    const MAX_RECORDS = 100;
    const FILTER = `AND({Status} = "Filled", FIND(ARRAYJOIN({Prospective Ventures}), "${ventureCode}"))`;
    return airtableService
      .getTableRecords(VENTURE_ROLES_TABLE, MAX_RECORDS, FILTER)
      .then(records => records
        .map(rec => {
          return {
            name: rec.fields["Contributor in text for website"],
            role: rec.fields["Role in text for website"],
            url: rec.fields['pic (from Contributor)'] ? rec.fields['pic (from Contributor)'][0].url : null
          } as TeamMember
        }))
  }

  async getOne(id: string): Promise<DASProject> {
    const MAX_RECORDS = 1;
    const ACTIVE_FILTER = `{AirTable ID} = "${id}"`;
    return await airtableService
      .getTableRecords(VENTURES_TABLE, MAX_RECORDS, ACTIVE_FILTER)
      .then(records => records.length === 0 ? null : this.airtableTransform(records[0].fields))
  }

  async getPeople(status: string): Promise<TeamMember[]> {
    const MAX_RECORDS = 100;
    const ACTIVE_FILTER = `{Manual Status} = "${status}"`
    return (await airtableService.getTableRecords(
      process.env.NEXT_PUBLIC_AIRTABLE_TABLE_PEOPLE_REFERENCE,
      MAX_RECORDS,
      ACTIVE_FILTER
    )).map(r => {
      return {
        name: `${r.fields['First name']} ${r.fields["Last name"]}`,
        role: r.fields["Position"],
        url: r.fields.pic && r.fields.pic[0] && r.fields.pic[0].thumbnails.large.url || undefined
      } as TeamMember
    });
  }

}

const dasProjectsService = new AirtableProjectsService();
const sanityProjectsService = new SantiyProjectService();

export { dasProjectsService, sanityProjectsService };
