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
                        {title: 'Community Engagement Liason', value: 'community-engagement-liaison'},
                        {title: 'Data Analyst', value: 'data-analyst'},
                        {title: 'UX/UI designer', value: 'ux-ui-designer'},
                        {title: 'Grant Writer', value: 'grant-writer'},
                        {title: 'Product Manager', value: 'product-manager'},
                        {title: 'Project Manager', value: 'project-manager'},
                        {title: 'User Experience Researcher', value: 'user-experience-researcher'},
                        {title: 'Social Media Designer', value: 'social-media-designer'},
                        {title: 'Social Media Specialist', value: 'social-media-specialist'},
                        {title: 'Software Engineer', value: 'software-developer'},
                        {title: 'Solution Architect', value: 'solution-architect'},
                        {title: 'Storyteller', value: 'storyteller-&-content-writer'},
                        {title: 'QA/Test Engineer', value: 'qa-test-engineer'}
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