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
import {
  BlockComponent,
  LoadingContext,
  withBasicLayout,
} from 'components/layouts'
import React, { useContext, useEffect, useState } from 'react'
import NewslettersImage from '../assets/newsletters.png'
import EmailFormContainer from 'components/email-form/EmailFormContainer'
import NewsletterList from 'components/NewsletterList'
import { fetchNewsletters, Newsletter } from '../services/NewsletterService'

const LABELS = {
  HERO_TITLE: 'Newsletters',
  HERO_TXT:
    'Stay updated on our latest community stories, volunteer highlights, and tech-driven impact',
  NEWSLETTERS_TITLE: 'Past News Letters',
}

// to be removed - this is just a placeholder for testing
const link =
  'https://img.freepik.com/free-photo/people-office-work-day_23-2150690162.jpg'
const DUMMY_NEWSLETTERS: Newsletter[] = [
  {
    _id: '1',
    title: 'AI in 2025: What’s Next?',
    description:
      'Explore the upcoming trends in artificial intelligence, including edge computing, AI regulation, and generative models taking center stage.',
    date: '2025-07-07',
    image: link,
    blob: null,
    active: true,
  },
  {
    _id: '2',
    title: 'June Recap: Product Updates',
    description:
      'Catch up on our latest product improvements, performance boosts, and roadmap reveals from the June update.',
    date: '2025-06-30',
    image: link,
    blob: null,
    active: true,
  },
  {
    _id: '3',
    title: 'Meet the Team Behind the Innovation',
    description:
      'We sat down with our engineering team to learn more about their process, inspiration, and what’s coming next.',
    date: '2025-06-15',
    image: link,
    blob: null,
    active: true,
  },
  {
    _id: '4',
    title: 'Security Best Practices in 2025',
    description:
      'Stay informed with the latest strategies for protecting user data, securing APIs, and handling cloud vulnerabilities.',
    date: '2025-05-25',
    image: link,
    blob: null,
    active: true,
  },
]

const NewslettersPage = () => {
  //const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [newsletters, setNewsletters] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setLoading } = useContext(LoadingContext)
  const [initialized, setInitialized] = useState<boolean>(false)

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
          <NewsletterList
            newsletters={
              newsletters.length > 0 ? newsletters : DUMMY_NEWSLETTERS
            }
          />
        </Box>
      </BlockComponent>
    </Container>
  )
}

export default withBasicLayout(NewslettersPage)
