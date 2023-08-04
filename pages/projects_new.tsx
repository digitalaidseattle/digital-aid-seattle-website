import { Typography, Stack, useTheme, styled } from '@mui/material'
import { withBasicLayout } from 'components/layouts'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import useMediaQuery from '@mui/material/useMediaQuery'

import ProjectCadreImage from 'assets/project-image.png'

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

const MobileHeader = styled(Typography)(({ theme }) => ({
  padding: '4rem 0',
  width: '100%',
  textAlign: 'center',
}))

const DesktopHeader = styled(Typography)(({ theme }) => ({
  padding: '5rem 0',
  width: '100%',
  textAlign: 'center',
}))

const ProjectsPage = () => {
  const theme = useTheme()

  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const projectData: CardProjectProps[] = [
    {
      title: 'The Cadre',
      partner: 'Open Seattle',
      programAreas: ['Civic technology'],
      description:
        'Open Seattle works with Seattle-based nonprofits to create customized digital solutions for their needs, for free.',
      status: 'active' as 'active',
      projectLink: '/project_cadre',
      imageSrc: ProjectCadreImage.src,
      imageAlt: 'Open seattle logo',
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
          <MobileHeader variant="displayMedium">Projects</MobileHeader>
        ) : (
          <DesktopHeader variant="displayLarge">Projects</DesktopHeader>
        )}
      </Stack>

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
