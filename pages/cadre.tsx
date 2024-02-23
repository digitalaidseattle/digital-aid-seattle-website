/*
 * @2023 Digital Aid Seattle
 */
import { useContext, useEffect, useState } from 'react'

import {
  Stack,
  useTheme
} from '@mui/material'
import SectionContainer from 'components/layout/SectionContainer'
import { dasProjectsService } from './api/ProjectsService'

import { LoadingBlock, LoadingContext, withBasicLayout } from 'components/layouts'
// icons for role cards
import {
  ProjectBodyTextSection,
  ProjectContactUsSection,
  ProjectFooterSection,
  ProjectHeaderSection,
  ProjectTeamSection
} from 'components/ProjectComponents'
import RolesSection from 'components/RolesSection'
import { DASProject, DASVolunteerRoleBasicInfo, TeamMember } from 'types'
import { dasVolunteerRoleService } from './api/VolunteerRoleService'

const TheCadrePage = () => {
  const [project, setProject] = useState<DASProject>()
  const [volunteerRoles, setVolunteerRoles] = useState<DASVolunteerRoleBasicInfo[]>([])
  const { setLoading } = useContext(LoadingContext)
  const [members, setMembers] = useState<TeamMember[]>([])


  useEffect(() => {
    setLoading(true);
    Promise.all([
      dasVolunteerRoleService.getAllActiveRoles(),
      dasProjectsService.getOne('the-cadre'),
      dasProjectsService.getPeople('ongoing')
    ])
      .then(resps => {
        setVolunteerRoles(resps[0]);
        setProject(resps[1]);
        setMembers(resps[2].sort((r1, r2) => r1.name.localeCompare(r2.name)));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [setLoading])

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
          <ProjectTeamSection title="Current team" members={members} />
          <RolesSection title="Roles needed" roles={volunteerRoles} />
          <ProjectContactUsSection />
        </Stack>
      </SectionContainer>
    )
  }

  return (
    <LoadingBlock>
      <ProjectHeaderSection project={project} />
      {project ? getBody() : <></>}
      <ProjectFooterSection />
    </ LoadingBlock>
  )
}

export default withBasicLayout(TheCadrePage)
