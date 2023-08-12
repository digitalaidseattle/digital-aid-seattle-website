/*
 * @2023 Open Seattle
 */

import {
  Container,
  Typography,
  useTheme,
} from '@mui/material'
import CardEvent from 'components/cards/CardEvent'
import CardRowContainer from 'components/cards/CardRowContainer'
import { withBasicLayout } from 'components/layouts'
import { useEffect, useState } from 'react'

import { osEventsService } from './api/EventsService'
import SectionContainer from 'components/layout/SectionContainer'

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
      <SectionContainer
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        maxWidth={false}
      >
        <Stack gap={{ xs: '2rem', md: '2rem' }} maxWidth={'880px'}>
          {events.map((event) => (
            <CardEvent key={event.title} event={event} />
          ))}
        </Stack>
      </SectionContainer>
    </div>
  )
}

export default withBasicLayout(EventsPage)
