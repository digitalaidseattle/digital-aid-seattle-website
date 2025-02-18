/*
 * @2024 Digital Aid Seattle
 */
import { useContext, useEffect, useState } from 'react'

import {
  Box,
  Stack,
  useTheme
} from '@mui/material'

import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import {
  ProjectBodyTextSection,
  ProjectContactUsSection,
  ProjectFooterSection,
  ProjectHeaderSection,
  ProjectTeamSection
} from 'components/ProjectComponents'
import RolesSection from 'components/RolesSection'
import { pageCopyService } from 'services/PageCopyService'
import { DASProject, DASVolunteerRoleBasicInfo, TeamMember } from 'types'
import ProjectImage from '../assets/project-image.png'
import { dasProjectsService } from '../services/ProjectsService'
import { dasVolunteerRoleService } from '../services/VolunteerRoleService'

const LABELS = {
  HERO_LBL: 'The Cadre',
  PROBLEM_LBL: 'Problem',
  PROBLEM_TXT: `Nonprofits that try to adopt new tech cannot staff for their digital needs. They grapple with efficiency and face operational burdens without proper digital tools, leading to funding shortages and lost volunteers.\n
77% of nonprofits say that skilled volunteers could majorly impact their mission, but only 12% actually utilize them. Most software projects will fail, even with financial backing. And—during the pandemic, Covid-related drops in volunteer hours nationwide reached 19%.\n
Washington state needs a more structured tech volunteering model.`,
  SOLUTION_LBL: 'Solution',
  SOLUTION_TXT: `The state of Washington boasts over 70,000 technologists, more than 55,000 residing in greater Seattle. Meanwhile, statistics show that 30% of professionals will volunteer if given the chance. SO, how can we utilize this resource?\n
Digital Aid Seattle fosters connections between volunteers and the orgs that can utilize their talents and provides nonprofits with digital systems and tools that boost their efforts.`,
  IMPACT_LBL: 'Impact',
  IMPACT_TXT: `Digital Aid Seattle helps nonprofits build the structure essential for success in any technology project, acting as a force multiplier to help organizations create lasting impact.`,
  CURRENT_TEAM_LBL: `Current team`,
  ROLES_NEEDED_LBL: `Roles Needed`
}
const TheCadrePage = () => {
  const [project, setProject] = useState<DASProject>()
  const [volunteerRoles, setVolunteerRoles] = useState<DASVolunteerRoleBasicInfo[]>([])
  const { setLoading } = useContext(LoadingContext)
  const [members, setMembers] = useState<TeamMember[]>([])

  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      pageCopyService
        .updateCopy(LABELS, 'cadre')
        .then(() => {
          setProject({
            imageSrc: ProjectImage.src,
            title: LABELS.HERO_LBL
          } as DASProject)
          setInitialized(true);
        })
    }
  }, [initialized]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dasVolunteerRoleService.getAllActiveRoles(),
      dasProjectsService.getPeople('Cadre')
    ])
      .then(resps => {
        setVolunteerRoles(resps[0]);
        setMembers(resps[1].sort((r1, r2) => r1.name.localeCompare(r2.name)));
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
          <ProjectBodyTextSection title={LABELS.PROBLEM_LBL} texts={(LABELS.PROBLEM_TXT ?? '').split('\n') as unknown as string[]} />
          <ProjectBodyTextSection title={LABELS.SOLUTION_LBL} texts={(LABELS.SOLUTION_TXT ?? '').split('\n') as unknown as string[]} />
          <ProjectBodyTextSection title={LABELS.IMPACT_LBL} texts={(LABELS.IMPACT_TXT ?? '').split('\n') as unknown as string[]} />
          <ProjectTeamSection title={LABELS.CURRENT_TEAM_LBL} members={members} />
          <RolesSection showLink={true} title={LABELS.ROLES_NEEDED_LBL} roles={volunteerRoles} />
          <ProjectContactUsSection />
        </Stack>
      </SectionContainer>
    )
  }

  return (
    <BlockComponent block={!project}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default
        }}>
        <ProjectHeaderSection project={project} hideStatus={true} hideBreadcrumbs={true} />
        {project ? getBody() : <></>}
        <ProjectFooterSection />
      </Box>
    </ BlockComponent>
  )
}

export default withBasicLayout(TheCadrePage)
