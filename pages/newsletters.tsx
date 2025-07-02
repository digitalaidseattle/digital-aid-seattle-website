/**
 * Newsletters.tsx
 *
 * @2023 Digital Aid Seattle
 */

import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MastheadWithImage from 'components/MastheadWithImage'
import RolesSection from 'components/RolesSection'
import {
  BlockComponent,
  LoadingContext,
  withBasicLayout,
} from 'components/layouts'
import React, { useContext, useEffect, useState } from 'react'
import { DASVolunteerRoleBasicInfo } from 'types'

import { pageCopyService } from 'services/PageCopyService'
import NewslettersImage from '../assets/newsletters.png'
import { dasVolunteerRoleService } from '../services/VolunteerRoleService'
import EmailFormContainer from 'components/email-form/EmailFormContainer'

/* eslint-disable @next/next/no-img-element */

const LABELS = {
  HERO_TITLE: 'Newsletters',
  HERO_TXT:
    'Stay updated on our latest community stories, volunteer highlights, and tech-driven impact',
  NEWSLETTERS_TITLE: 'Past News Letters',
}

const NewslettersPage = () => {
  const [volunteerRoles, setVolunteerRoles] = useState<
    DASVolunteerRoleBasicInfo[]
  >([])
  const { setLoading } = useContext(LoadingContext)
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      setLoading(true)

      Promise.all([
        dasVolunteerRoleService.getAllActiveRoles(),

        pageCopyService.updateCopy(LABELS, 'volunteers'),
      ])
        .then((resps) => {
          setVolunteerRoles(resps[0])
          setInitialized(true)
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [initialized, setLoading])

  const theme = useTheme()
  const palette = theme.palette
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const rolesSection = () => {
    return (
      <Stack
        gap={{ xs: '64px', md: '80px' }}
        sx={{
          textAlign: 'center',
          paddingY: { xs: 4, md: 8 },
          paddingX: { xs: '1rem', md: '2rem', lg: 0 },
        }}
        maxWidth={'880px'}
      >
        <RolesSection
          title={LABELS.NEWSLETTERS_TITLE}
          showLink={true}
          showFilters={true}
          roles={volunteerRoles}
        />
      </Stack>
    )
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <MastheadWithImage
        imageSrc={NewslettersImage.src}
        imageText="Volunteer graphic"
      >
        <>
          <Typography
            variant={isSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            {LABELS.HERO_TITLE}
          </Typography>
          <Typography
            variant="headlineLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            component="span"
          >
            {LABELS.HERO_TXT}
          </Typography>
        </>
      </MastheadWithImage>
      <BlockComponent block={!initialized}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <EmailFormContainer showLabel={false} />
          {rolesSection()}
        </Box>
      </BlockComponent>
    </Container>
  )
}

export default withBasicLayout(NewslettersPage)
