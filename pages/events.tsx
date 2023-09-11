/*
 * @2023 Open Seattle
 */

import { Box, Container, Stack, Typography, useTheme } from '@mui/material'
import CardEvent from 'components/cards/CardEvent'
import { withBasicLayout } from 'components/layouts'
import { useEffect, useState } from 'react'

import SectionContainer from 'components/layout/SectionContainer'
import { osEventsService } from './api/EventsService'

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
  const palette = theme.palette

  const title = 'Events'
  const [events, setEvents] = useState([])
  const title = 'Events';
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(osEventsService.getActiveEvents())
  }, [])
    osEventsService.getActiveEvents()
      .then(evs => setEvents(evs))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))      
  }, []);

  return (
    <div>
      <Masthead title="Events" />
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          maxWidth={'880px'}
        >
          <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth={'880px'}>
            {events.map((event) => (
              <CardEvent key={event.title} event={event} />
            ))}
            {events.length === 0 && (
              <Typography sx={{ textAlign: 'center' }}>
                There are currently no events scheduled, please check back in
                the future.
              </Typography>
            )}
          </Stack>
        </Box>
      </SectionContainer>
    </div>
      <Masthead title={title} />
      <Container
        sx={{
          backgroundColor: palette.primary.contrastText,
          padding: { md: '5rem' },
        }}
        maxWidth={false}
      >
        {loading &&
          <Stack
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              alignItems: 'center',
              padding: {
                xs: '2.5rem 1rem 4rem 1rem',
                md: '2.5rem 2rem 4rem 2rem',
                lg: '2.5rem 12.5rem 7.5rem 12.5rem',
              },
            }}><CircularProgress />
          </Stack>}
        {(!loading && events.length > 0) &&
          <CardRowContainer>
            {events.map(event => <CardEvent key={event.title} event={event} />)}
          </CardRowContainer>}
        {(!loading && events.length === 0) &&
          <Stack
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              alignItems: 'center',
              padding: {
                xs: '2.5rem 1rem 4rem 1rem',
                md: '2.5rem 2rem 4rem 2rem',
                lg: '2.5rem 12.5rem 7.5rem 12.5rem',
              },
            }}>
            <Typography sx={{ textAlign: 'center' }}>
              There are currently no events scheduled, please check back in the future.
            </Typography>
          </Stack>}
      </Container>
    </div >
  )
}

export default withBasicLayout(EventsPage)
