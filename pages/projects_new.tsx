import { Typography, Stack, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import useMediaQuery from '@mui/material/useMediaQuery'

import Placeholder from '../assets/placeholder-img.png'

const ProjectsPage = () => {
  const theme = useTheme()

  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const projectData = [
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
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        {extraSmallScreen ? (
          <Typography
            variant="displayMedium"
            sx={{
              padding: '4rem 0',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Projects
          </Typography>
        ) : (
          <Typography
            variant="displayLarge"
            sx={{
              padding: '5rem 0',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Projects
          </Typography>
        )}
      </Stack>

    <Stack 
    sx={{
      width: '100%',
      backgroundColor: theme.palette.primary.contrastText,
      padding: {
        xs: '1rem', md: '2rem', lg: '2.5rem 12.5rem' 
      }
      }}>

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
