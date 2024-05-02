import { Box, Chip, Divider, Stack, useTheme } from '@mui/material'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import Masthead from 'components/Masthead'
import { useContext, useEffect, useState } from 'react'
import { DASProject } from 'types'

import { dasProjectsService } from './api/ProjectsService'
import { Check } from '@mui/icons-material'
import { StatusLabels } from 'components/ProjectComponents'


// TODO consider moving into Sanity
const LABELS = {
  PAGE_TITLE: 'Projects',
}

const ProjectsPage = () => {
  const theme = useTheme()

  const { setLoading } = useContext(LoadingContext);
  const [init, setInit] = useState<boolean>(false);
  const [projects, setProjects] = useState<Map<string, DASProject[]>>(new Map());
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<DASProject[][]>([]);

  useEffect(() => {
    setLoading(true);
    dasProjectsService.getAll()
      .then(projs => {
        const map = new Map();
        dasProjectsService.filteredStatuses.forEach(st => map.set(st, []))
        projs
          .filter(proj => proj.display || proj.display === undefined)
          .forEach(project => map.get(project.status).push(project));
        setProjects(map);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setInit(true)
        setLoading(false)
      })
  }, [setLoading]);

  useEffect(() => {
    if (init) {
      const displayedStatuses = filterStatuses.length === 0
        ? dasProjectsService.filteredStatuses
        : filterStatuses

      // to preserve order, use dasProjectsService.filteredStatuses
      setDisplayedProjects(dasProjectsService.filteredStatuses
        .filter(st => displayedStatuses.includes(st) && projects.get(st).length > 0)
        .map(st => projects.get(st)));
    }
  }, [init, filterStatuses, projects]);

  const toggleStatus = (status: string) => {
    if (filterStatuses.includes(status)) {
      setFilterStatuses(filterStatuses.filter(s => s !== status));
    } else {
      setFilterStatuses(filterStatuses.concat(status));
    }
  }

  return (
    <>
      <Masthead title={LABELS.PAGE_TITLE} />
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
            <Stack direction="row" gap="1.5rem" marginBottom="3rem" sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {dasProjectsService.filteredStatuses.map((status) =>
                <Chip key={status} label={StatusLabels[status]}
                  variant={filterStatuses.includes(status) ? "filled" : "outlined"}
                  icon={filterStatuses.includes(status) && <Check />}
                  onClick={() => toggleStatus(status)} />)}
            </Stack>
            {displayedProjects.map((projects, idx) =>
              <Box key={idx}>
                {(idx > 0) && <Divider sx={{ margin: '1rem' }} flexItem />}
                <CardGridContainer>
                  {projects
                    .map((project) => (
                      <CardProject
                        key={project.id}
                        project={project}
                      />
                    ))}
                </CardGridContainer>
              </Box>
            )}
          </Stack>
        </Box>
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(ProjectsPage)
