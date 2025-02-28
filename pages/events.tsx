/**
 * events.tsx
 *
 * Page to display list of events
 * 
 * @2024 Digital Aid Seattle
 */
import {
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import CardEvent from 'components/cards/CardEvent'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { useContext, useEffect, useState } from 'react'
import { OSEvent } from 'types'

import MastheadWithImage from 'components/MastheadWithImage'
import EventsImage from '../assets/events.png'
import { eventsService } from '../services/EventsService'
import { pageCopyService } from 'services/PageCopyService'

const LABELS = {
  HERO_TITLE: 'Events',
  HERO_TXT: 'Join vibrant in-person team-building events! Connect, share laughter, and forge friendships that inspire collaboration and creativity!',
  TITLE_IMAGE: 'Events graphic',
  UPCOMING_TXT: 'All upcoming events are invite-only. Please check back in the future for public events.',
  PAST_TITLE: 'Past Events'
}

const EventsPage = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const title = 'Events'
  const { setLoading } = useContext(LoadingContext);
  const [futureEvents, setFutureEvents] = useState<OSEvent[] | null>([])
  const [pastEvents, setPastEvents] = useState<OSEvent[] | null>([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!initialized) {
      setLoading(true);
      Promise
        .all([
          pageCopyService.updateCopy(LABELS, 'events'),
          eventsService.getActiveEvents()
        ])
        .then(resps => {
          //  gets today's date in the user's timezone, in ISO format (YYYY-MM-DD)
          const today = new Date().toLocaleDateString("sv");
          const eventsDescending = resps[1].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
          setFutureEvents(eventsDescending.filter((event) => event.date >= today))
          setPastEvents(eventsDescending.filter((event) => event.date < today))
          setInitialized(true);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }
  }, [initialized])


  return (
    <>
      <MastheadWithImage
        imageSrc={EventsImage.src}
        imageText={LABELS.TITLE_IMAGE}
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
        <SectionContainer backgroundColor={theme.palette.background.default}>
          <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth='880px'>
            {futureEvents.map((event) => (
              <CardEvent key={event.title} event={event} />
            ))}
            {futureEvents.length === 0 && (
              <Typography sx={{ textAlign: 'center' }}>
                {LABELS.UPCOMING_TXT}
              </Typography>
            )}
          </Stack>
        </SectionContainer>
        {pastEvents.length > 0 && <SectionContainer backgroundColor={theme.palette.background.default}>
          <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth='880px'>
            <Typography variant="headlineLarge" sx={{ textAlign: 'center' }}>
              {LABELS.PAST_TITLE}
            </Typography>
            {pastEvents.map((event) => (
              <CardEvent key={event.title} event={event} />
            ))}
          </Stack>
        </SectionContainer>}
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(EventsPage)
