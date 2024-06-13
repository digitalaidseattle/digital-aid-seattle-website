/*
 * @2023 Digital Aid Seattle
 */

import {
  Container,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import CardEvent from 'components/cards/CardEvent'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { useContext, useEffect, useState } from 'react'
import { OSEvent } from 'types'

import { eventsService } from './api/EventsService'

type MastheadProps = {
  title: string
}

const Masthead = ({ title }: MastheadProps) => {
  const theme = useTheme()

  return (
    <Container
      sx={{
        backgroundColor: theme.palette.primary.main,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingY: '5rem',
      }}
      maxWidth={false}
    >
      <Typography
        variant="displayMedium"
        sx={{
          color: theme.palette.primary.contrastText,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
      </Typography>
    </Container>
  )
}

const EventsPage = () => {
  const theme = useTheme()

  const title = 'Events'
  const { setLoading } = useContext(LoadingContext);
  const [futureEvents, setFutureEvents] = useState<OSEvent[] | null>([])
  const [pastEvents, setPastEvents] = useState<OSEvent[] | null>([])
  const [init, setInit] = useState(false)

  useEffect(() => {
    setLoading(true);
    eventsService
      .getActiveEvents()
      .then((evs) => {
        //  gets today's date in the user's timezone, in ISO format (YYYY-MM-DD)
        const today = new Date().toLocaleDateString("sv");
        const eventsDescending = evs.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        setFutureEvents(eventsDescending.filter((event) => event.date >= today))
        setPastEvents(eventsDescending.filter((event) => event.date < today))
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false)
        setInit(true)
      })
  }, [setLoading])

  return (
    <>
      <Masthead title={title} />
      <BlockComponent block={!init}>
        <SectionContainer backgroundColor={theme.palette.background.default}>
          <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth='880px'>
            {futureEvents.map((event) => (
              <CardEvent key={event.title} event={event} />
            ))}
            {futureEvents.length === 0 && (
              <Typography sx={{ textAlign: 'center' }}>
                All upcoming events are invite-only. Please check back in the
                future for public events.
              </Typography>
            )}
          </Stack>
        </SectionContainer>
        {pastEvents.length > 0 && <SectionContainer backgroundColor={theme.palette.background.default}>
          <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth='880px'>
            <Typography variant="headlineLarge" sx={{ textAlign: 'center' }}>Past Events</Typography>
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
