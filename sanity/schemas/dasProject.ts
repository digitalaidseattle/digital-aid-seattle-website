import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

/**
 * From 
 type CardProjectProps = {
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: 'active' | 'recruiting' | 'complete'
  projectLink: string
  duration?: { start: string; end: string }
  imageSrc: string
  imageAlt: string
}
 */
export default {
    name: 'das-project',
    type: 'document',
    title: 'Digital Aid Seattle Project',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "das-project" }),
        {
            name: 'id',
            type: 'string',
            title: 'ID'
        },
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'partner',
            type: 'string',
            title: 'Partner'
        },
        {
            name: 'programAreas',
            type: 'array',
            title: 'Program Areas',
            of: [{ type: 'string' }]
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'status',
            type: 'string',
            title: 'Status',
            options: {
                list: ['active', 'recruiting', 'complete']
            }
        },
        {
            name: 'projectLink',
            type: 'string',
            title: 'Project Link'
        },
        {
            name: 'duration',
            type: 'object',
            title: 'Duration',
            fields: [
                {
                    name: 'start',
                    title: 'Start',
                    type: 'string'
                },
                {
                    name: 'end',
                    title: 'End',
                    type: 'string'
                }
            ]
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string'
                }
            ]
        },
        {
            name: 'problem',
            type: 'array',
            title: 'Problem',
            of: [{ type: 'string' }]
        },
        {
            name: 'solution',
            type: 'array',
            title: 'Solution',
            of: [{ type: 'string' }]
        },
        {
            name: 'impact',
            type: 'array',
            title: 'Impact',
            of: [{ type: 'string' }]
        },
        {
            name: 'rolesNeeded',
            type: 'array',
            title: 'Roles Needed',
            of: [{
                type: 'string',
                options: {
                    list: [
                        {title: 'Community Engagement Liason', value: 'communityEngagementLiason'},
                        {title: 'Data Analyst', value: 'dataAnalyst'},
                        {title: 'Designer', value: 'designer'},
                        {title: 'Grant Writer', value: 'grantWriter'},
                        {title: 'Legal Help', value: 'legalHelp'},
                        {title: 'Product Manager', value: 'productManager'},
                        {title: 'Project Manager', value: 'projectManager'},
                        {title: 'UX Researcher', value: 'uxResearcher'},
                        {title: 'Social Media Designer', value: 'socialMediaDesigner'},
                        {title: 'Social Media Specialist', value: 'socialMediaSpecialist'},
                        {title: 'Software Engineer', value: 'softwareEngineer'},
                        {title: 'Solution Architect', value: 'solutionArchitect'},
                        {title: 'Storyteller', value: 'storyteller'},
                        {title: 'QA Specialist', value: 'qaSpecialist'}
                    ]
                }
            }]
        },
        {
            name: 'currentTeam',
            type: 'array',
            title: 'Current Team',
            of: [{ type: 'team-member' }]
        },
        {
            name: 'display',
            type: 'boolean',
            title: 'Display'
        }
    ]
} 