/*
 * @2024 Digital Aid Seattle
 */
import {
  Box,
  Button,
  Stack,
  useTheme
} from '@mui/material'
import { ProjectBodyMarkdownSection, ProjectFooterSection, ProjectHeaderSection, ProjectLabels, ProjectTeamSection } from 'components/ProjectComponents'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { Section, Subheader } from 'components/style-utils'
import { useVolunteers } from 'components/useVolunteers'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { CodaVentureService } from 'services/codaVentureService'
import { DASProject, Volunteer } from 'types'

const ProjectIndividualPage = () => {
  const ventureService = CodaVentureService.getInstance();
  const { data: volunteers } = useVolunteers();

  const router = useRouter();
  const theme = useTheme()
  const { setLoading } = useContext(LoadingContext);

  const [project, setProject] = useState<DASProject>()
  const [teamMembers, setTeamMembers] = useState<Volunteer[]>([]);

  useEffect(() => {

    function fetchData() {
      setLoading(true);
      const projectId = router.query.slug ? router.query.slug[0] : null;
      if (projectId) {
        ventureService.getById(projectId)
          .then((venture) => {
            if (venture == null) {
              console.error(`Project '${projectId} not found.`);
              router.push('/404');
            } else {
              setProject(venture);
            }
          })
          .catch((error) => {
            console.error(error);
            router.push('/404');
          })
          .finally(() => setLoading(false))
      }
    }

    fetchData();
  }, [router, setLoading, ventureService]);

  useEffect(() => {
    function fetchTeamMembers() {
      setLoading(true);
      const memberNames = project.currentTeam.map(mem => mem.name);
      const found = volunteers.filter(v => memberNames.includes(v.name));
      setTeamMembers(found);
      setLoading(false);
    }
    if (project && volunteers) {
      fetchTeamMembers();
    }
  }, [project, volunteers, setLoading]);



  function getBody() {
    return (
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '64px', lg: '80px' }}
          maxWidth="880px"
          margin="0 auto"
        >
          <ProjectBodyMarkdownSection title={ProjectLabels.description} text={project.description} />
          <ProjectBodyMarkdownSection title={ProjectLabels.problem} text={project.problem} />
          <ProjectBodyMarkdownSection title={ProjectLabels.solution} text={project.solution} />
          <ProjectBodyMarkdownSection title={ProjectLabels.impact} text={project.impact} />
          <ProjectTeamSection title="Current team" members={teamMembers} />
          <Section>
            <Subheader variant="headlineMedium">
              {ProjectLabels.questions}
            </Subheader>
            <Button variant="outlined" href="mailto:info@digitalaidseattle.org">
              {ProjectLabels.contact_us}
            </Button>
          </Section>
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
        <ProjectHeaderSection project={project} />
        {project && getBody()}
        <ProjectFooterSection />
      </Box>
    </ BlockComponent>
  )
}

export default withBasicLayout(ProjectIndividualPage)
