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

  useEffect(() => {
    setEvents(osEventsService.getActiveEvents())
  }, [])

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
          </Stack>
        </Box>
      </SectionContainer>
    </div>
  )
}

export default withBasicLayout(EventsPage)
