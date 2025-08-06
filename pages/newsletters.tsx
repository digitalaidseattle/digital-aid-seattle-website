/**
 * Newsletters.tsx
 *
 * @2023 Digital Aid Seattle
 */

import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MastheadWithImage from 'components/MastheadWithImage'
import {
  BlockComponent,
  LoadingContext,
  withBasicLayout,
} from 'components/layouts'
import React, { useContext, useEffect, useState } from 'react'
import NewslettersImage from '../assets/newsletters.png'
import EmailFormContainer from 'components/email-form/EmailFormContainer'
import NewsletterList from 'components/NewsletterList'
import { fetchNewsletters } from '../services/NewsletterService'
import { DASNewsletter } from 'types'
import { useRouter } from 'next/router'
import { useFeature } from '../services/FeatureService'

const LABELS = {
  HERO_TITLE: 'Newsletters',
  HERO_TXT:
    'Stay updated on our latest community stories, volunteer highlights, and tech-driven impact',
  NEWSLETTERS_TITLE: 'Past News Letters',
}

const NewslettersPage = () => {
  const [newsletters, setNewsletters] = useState<DASNewsletter[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setLoading } = useContext(LoadingContext)
  const [initialized, setInitialized] = useState<boolean>(false)
  const { data: newslettersFlag } = useFeature('newsletters')
  const router = useRouter()

  useEffect(() => {
    if (!initialized) {
      setLoading(true)
      fetchNewsletters()
        .then((data) => {
          setNewsletters(Array.isArray(data) ? data : [])
          setError(null)
        })
        .catch((err) => {
          setError('Failed to load newsletters.')
          setNewsletters([])
          console.error(err)
        })
        .finally(() => {
          setInitialized(true)
          setLoading(false)
        })
    }
  }, [initialized, setLoading])

  useEffect(() => {
    if (newslettersFlag !== undefined && newslettersFlag === false) {
      console.error('Newsletters feature not enabled.')
      router.push('/404')
    }
  }, [newslettersFlag, router])

  const theme = useTheme()
  const palette = theme.palette
  const isSmallScreen = useMediaQuery('(max-width:600px)')

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
          <NewsletterList newsletters={newsletters} />
        </Box>
      </BlockComponent>
    </Container>
  )
}

export default withBasicLayout(NewslettersPage)
