import { withBasicLayout } from 'components/layouts'
import {
  Container,
  Typography,
  useTheme,
} from '@mui/material'
import CardEvent from 'components/cards/CardEvent'
import EventPlaceholder from '../assets/event-placeholder.png'

const EventsPage = () => {
  const theme = useTheme()
  const palette = theme.palette

  return (
    <div>
      <Container
        sx={{
          backgroundColor: palette.primary.light,
          padding: { md: '2rem' },
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
          Events
        </Typography>
      </Container>
      <Container
        sx={{
          backgroundColor: palette.primary.contrastText,
          padding: { md: '5rem' },
        }}
        maxWidth={false}
      >
        <CardEvent
          title='Earth-a-thon'
          date='March 27th, 2023'
          time={{ start: '6:00', end: '8:00PM' }}
          location='123 ABC Street, Seattle, WA'
          description='Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
          imageSrc={EventPlaceholder.src}
          imageAlt=''
          buttonLink=''
        ></CardEvent>

        <CardEvent
          title='Event Title'
          date='March 27th, 2023'
          time={{ start: '6:00', end: '8:00PM' }}
          location='123 ABC Street, Seattle, WA'
          description='Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
          imageSrc=''
          imageAlt=''
          buttonLink=''
        ></CardEvent>
        <CardEvent
          title='Event Title'
          date='March 27th, 2023'
          time={{ start: '6:00', end: '8:00PM' }}
          location='123 ABC Street, Seattle, WA'
          description='Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
          imageSrc=''
          imageAlt=''
          buttonLink=''
        ></CardEvent>
      </Container>
    </div >
  )
}

export default withBasicLayout(EventsPage)
