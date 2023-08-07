/*
* @2023 Open Seattle
*/

import { Container, useTheme } from '@mui/material'
import Masthead from 'components/Masthead'
import CardEvent from 'components/cards/CardEvent'
import CardRowContainer from 'components/cards/CardRowContainer'
import { withBasicLayout } from 'components/layouts'
import { useEffect, useState } from 'react'
import { osEventsService } from './api/EventsService'


const EventsPage = () => {
  const theme = useTheme()
  const palette = theme.palette

  const title = 'Events';
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(osEventsService.getActiveEvents());
  }, []);

  return (
    <div>
      <Masthead title={title} />
      <Container
        sx={{
          backgroundColor: palette.primary.contrastText,
          padding: { md: '5rem' },
        }}
        maxWidth={false}
      >
        <CardRowContainer>
          {events.map(event => <CardEvent key={event.title} event={event} />)}
        </CardRowContainer>
      </Container>
    </div >
  )
}

export default withBasicLayout(EventsPage)
