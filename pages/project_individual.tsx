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
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { DASProject } from 'types'
import { dasProjectsService } from './api/ProjectsService'

const ProjectIndividualPage = () => {
  const router = useRouter();

  const [project, setProject] = useState<DASProject>()
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search)
    const projectId = params.get('project')
    dasProjectsService.getOne(projectId)
      .then((resp) => {
        if (resp == null) {
          console.error(`Project '${projectId} not found.`);
          router.push('/404');
        } else {
          dasProjectsService.getSquad(resp.ventureCode)
            .then(team => {
              resp.currentTeam = team;
              setProject(resp)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
        }
      })
      .catch((error) => {
        console.error(error);
        router.push('/404');
      })
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
          <ProjectBodyMarkdownSection title={ProjectLabels.description} text={project.description} />
          <ProjectBodyMarkdownSection title={ProjectLabels.problem} text={project.problem} />
          <ProjectBodyMarkdownSection title={ProjectLabels.solution} text={project.solution} />
          <ProjectBodyMarkdownSection title={ProjectLabels.impact} text={project.impact} />
          <ProjectTeamSection title="Current team" members={project.currentTeam} />
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
