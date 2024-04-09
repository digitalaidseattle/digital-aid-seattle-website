import { Box, Divider, Stack, useTheme } from '@mui/material'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import Masthead from 'components/Masthead'
import { useContext, useEffect, useState } from 'react'
import { DASProject } from 'types'

import { dasProjectsService } from './api/ProjectsService'

const ProjectsPage = () => {
  const theme = useTheme()

  const title = 'Projects';
  const { setLoading } = useContext(LoadingContext);
  const [projects, setProjects] = useState<Map<string, DASProject[]>>(new Map());
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dasProjectsService.getAll()
      .then(projs => {
        const map = new Map();
        dasProjectsService.filteredStatuses.forEach(st => map.set(st, []))
        projs
          .filter(proj => proj.display || proj.display === undefined)
          .forEach(project => map.get(project.airtableStatus).push(project));
        setProjects(map);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setInit(true)
        setLoading(false)
      })
  }, [setLoading]);

  return (
    <>
      <Masthead title={title} />
      <BlockComponent block={!init}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack
            sx={{
              paddingX: {
                xs: '1rem',
                md: '2rem',
                lg: '0',
              },
              paddingTop: '2.5rem',
              paddingBottom: {
                xs: '3rem',
                md: '4rem',
                lg: '7.5rem',
              },
            }}
            maxWidth={'880px'}
          >
            {dasProjectsService.filteredStatuses.map((st, idx) =>
              projects.get(st) &&
              <Box key={idx}>
                <CardGridContainer>
                  {projects.get(st)
                    .map((project) => (
                      <CardProject
                        key={project.id}
                        project={project}
                      />
                    ))}
                </CardGridContainer>
                {(idx < dasProjectsService.filteredStatuses.length - 1) && <Divider sx={{ margin: '1rem' }} flexItem />}
              </Box>
            )}
          </Stack>
        </Box>
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(ProjectsPage)
