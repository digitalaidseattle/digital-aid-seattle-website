/**
 * projects.tsx
 *
 * Page to display list of projects
 * 
 * @2024 Digital Aid Seattle
 */
import {
  Box,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { useContext, useEffect, useState } from 'react'
import { DASProject } from 'types'

import { Check } from '@mui/icons-material'
import { StatusLabels } from 'components/ProjectComponents'
import { dasProjectsService } from './api/ProjectsService'

import MastheadWithImage from 'components/MastheadWithImage'
import ProjectsImage from '../assets/projects.png'

// TODO consider moving into Sanity
const LABELS = {
  PAGE_TITLE: 'Projects',
  TITLE_IMAGE: 'Projects graphic',
  TITLE_COPY: 'We create digital solutions that empower communities, enhance collaboration, and inspire positive change!',
  NO_MATCHES: 'No matching projects found.',
  ARIA_LABEL_FILTERS: 'filter projects by status'
}

const ProjectsPage = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const { setLoading } = useContext(LoadingContext);
  const [init, setInit] = useState<boolean>(false);
  const [projects, setProjects] = useState<DASProject[]>([]);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<DASProject[]>([]);

  useEffect(() => {
    setLoading(true);
    dasProjectsService.getAll()
      .then(projs => setProjects(projs))
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

      setDisplayedProjects(projects
        .filter(p => displayedStatuses.includes(p.status))
      )
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
      <MastheadWithImage
        imageSrc={ProjectsImage.src}
        imageText={LABELS.TITLE_IMAGE}
      >
        <>
          <Typography
            variant={isSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            {LABELS.PAGE_TITLE}
          </Typography>
          <Typography
            variant="headlineLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            component="span"
          >
            {LABELS.TITLE_COPY}
          </Typography>
        </>
      </MastheadWithImage>
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
            <Stack aria-label={LABELS.ARIA_LABEL_FILTERS} direction="row" gap="1.5rem" marginBottom="3rem" sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {dasProjectsService.filteredStatuses.map((status) =>
                <Chip
                  key={status}
                  label={StatusLabels[status]}
                  variant={filterStatuses.includes(status) ? "filled" : "outlined"}
                  icon={filterStatuses.includes(status) ? <Check /> : undefined}
                  onClick={() => toggleStatus(status)} />)}
            </Stack>
            {displayedProjects.length === 0 &&
              <Typography>{LABELS.NO_MATCHES}</Typography>
            }
            {displayedProjects.length > 0 &&
              <CardGridContainer>
                {displayedProjects
                  .map((project) => (
                    <CardProject
                      key={project.id}
                      project={project}
                    />
                  ))}
              </CardGridContainer>
            }
          </Stack>
        </Box>
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(ProjectsPage)
