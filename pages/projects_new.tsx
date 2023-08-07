import { Stack, useTheme } from '@mui/material'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import { withBasicLayout } from 'components/layouts'

import Masthead from 'components/Masthead'
import Placeholder from '../assets/placeholder-img.png'

type CardProjectProps = {
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: 'active' | 'recruiting' | 'complete'
  projectLink: string
  duration: { start: string; end: string }
  imageSrc: string
  imageAlt: string
}


const ProjectsPage = () => {
  const theme = useTheme()

  const projectData: CardProjectProps[] = [
    {
      title: 'Seattle Humane Society',
      partner: 'City of Bellevue',
      programAreas: ['Animals'],
      description:
        'Seattle Humane has survived and thrived for over 125 years, always leading with compassion as we care for pets and the people who love them.',
      status: 'recruiting' as 'recruiting',
      projectLink: '',
      duration: { start: 'Jun 12', end: 'Nov 1' },
      imageSrc: Placeholder.src,
      imageAlt: 'placeholder',
    },
    {
      title: 'CiviForm',
      partner: 'City of Seattle',
      programAreas: ['Civic equity'],
      description:
        'A simpler way to access & administer government benefits: CiviForm makes it easier to access public assistance by consolidating applications and saving residents time.',
      status: 'active' as 'active',
      projectLink: '',
      duration: { start: 'Apr 2', end: 'Aug 10' },
      imageSrc: Placeholder.src,
      imageAlt: 'placeholder',
    },
    {
      title: 'Clearviction App',
      partner: 'Clearviction',
      programAreas: ['Civic equity'],
      description:
        'Open Seattle works with Seattle-based nonprofits to create customized digital solutions for their needs, for free.',
      status: 'complete' as 'complete',
      projectLink: '',
      duration: { start: 'Jan 1', end: 'Feb 15' },
      imageSrc: Placeholder.src,
      imageAlt: 'placeholder',
    },
    {
      title: 'Clearviction App',
      partner: 'Clearviction',
      programAreas: ['Civic equity'],
      description:
        'Open Seattle works with Seattle-based nonprofits to create customized digital solutions for their needs, for free.',
      status: 'complete' as 'complete',
      projectLink: '',
      duration: { start: 'Jan 1', end: 'Feb 15' },
      imageSrc: Placeholder.src,
      imageAlt: 'placeholder',
    },
  ]

  return (
    <>
      <Masthead title="Projects" />
      <Stack
        sx={{
          width: '100%',
          backgroundColor: theme.palette.primary.contrastText,
          padding: {
            xs: '2.5rem 1rem 4rem 1rem',
            md: '2.5rem 2rem 4rem 2rem',
            lg: '2.5rem 12.5rem 7.5rem 12.5rem',
          },
        }}
      >
        <CardGridContainer>
          {projectData.map((project) => (
            <CardProject
              key={project.title}
              title={project.title}
              partner={project.partner}
              programAreas={project.programAreas}
              description={project.description}
              status={project.status}
              projectLink={project.projectLink}
              duration={project.duration}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
            />
          ))}
        </CardGridContainer>
      </Stack>
    </>
  )
}

export default withBasicLayout(ProjectsPage)
