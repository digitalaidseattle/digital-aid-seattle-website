/*
 * @2023 Digital Aid Seattle
 */
import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  useTheme
} from '@mui/material'
import SectionContainer from 'components/layout/SectionContainer'
import { dasProjectsService } from './api/ProjectsService'

import { withBasicLayout } from 'components/layouts'
import {
  ProjectBodyTextSection,
  ProjectContactUsSection,
  ProjectFooterSection,
  ProjectHeaderSection,
  ProjectRolesSection,
  ProjectSection,
  ProjectSubheader,
  ProjectTeamSection
} from 'components/ProjectComponents'
import { DASProject } from 'types'


const ProjectIndividualPage = () => {
  const [project, setProject] = useState<DASProject>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    dasProjectsService
      .getOne(params.get('project'))
      .then((data) => setProject(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  const theme = useTheme()

  function getBody() {
    return (
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '64px', lg: '80px' }}
          maxWidth="880px"
          margin="0 auto"
        >
          <ProjectBodyTextSection title="Problem" texts={project.problem} />
          <ProjectBodyTextSection title="Solution" texts={project.solution} />
          <ProjectBodyTextSection title="Impact" texts={project.impact} />
          <ProjectTeamSection title="Current team" members={project.currentTeam} />
          <ProjectRolesSection title="Roles needed" roles={project.rolesNeeded} />
          <ProjectContactUsSection />
        </Stack>
      </SectionContainer>
    )
  }

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <ProjectHeaderSection project={project} />
      {project ? getBody() : <></>}
      <ProjectFooterSection />
    </>
  )
}

export default withBasicLayout(ProjectIndividualPage)
