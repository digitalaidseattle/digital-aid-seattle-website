/*
 * @2024 Digital Aid Seattle
 */
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { OSEvent } from 'types'
import { urlForImage } from '../../sanity/lib/image'
import { eventsService } from 'services/EventsService'
import { CardActionArea } from '@mui/material'

import ProjectImage from '../../assets/project-image.png'
const PLACEHOLDER_IMAGE = ProjectImage.src;

type CardEventProps = {
  event: OSEvent
}

const CardEvent = ({ event }: CardEventProps) => {
  const theme = useTheme()
  const tabletScreen = useMediaQuery(theme.breakpoints.only('md'))

  const imageSrc = event.image && event.image.asset
    ? urlForImage(event.image).url()
    : PLACEHOLDER_IMAGE;

  const MobileAndDesktopCard = () => {
    return (
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={{ xs: '0', lg: '1.5rem' }}
      >
        <Box
          sx={{
            position: 'relative',
            border: '2px solid #EAF1F1',
            height: { xs: '0', lg: '20rem' },
            width: { xs: '100%', lg: '20rem' },
            paddingBottom: { xs: '100%', lg: '0' },
            flexShrink: '0',
            margin: { xs: '0', lg: '2rem 0 2rem 2rem' },
            minWidth: '0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={imageSrc}
            sx={{
              position: { xs: 'absolute', lg: 'static' },
              height: '100%',
            }}
          />
        </Box>
        <CardContent
          sx={{
            padding: { xs: '2rem 1rem 1rem 1rem', lg: '2rem 2rem 2rem 0' },
            paddingBottom: { xs: '1rem !important', lg: '2rem !important' },
          }}
        >
          <Stack justifyContent="center" sx={{ height: '100%' }}>
            <Stack spacing="1rem">
              <Typography variant="titleLarge">{event.title}</Typography>
              <Stack direction="row" spacing="1rem">
                <Typography variant="labelLarge">{event.date}</Typography>
                <Typography variant="labelLarge">
                  {eventsService.getTimeString(event)}
                </Typography>
              </Stack>
              <Typography variant="labelMedium">{event.location}</Typography>
            </Stack>

            <Typography
              variant="bodyMedium"
              sx={{ display: 'block', marginTop: '1.5rem' }}
            >
              {event.description}
            </Typography>
          </Stack>
        </CardContent>
      </Stack>
    )
  }

  const TabletCard = () => {
    return (
      <CardContent>
        <Stack direction="row">
          <Box
            sx={{
              position: 'relative',
              border: '2px solid #EAF1F1',
              height: '10rem',
              width: '10rem',
            }}
          >
            <CardMedia
              component="img"
              image={imageSrc}
              sx={{
                position: 'static',
                height: '100%',
                borderRadius: '8px',
              }}
            />
          </Box>
          <Stack
            spacing="1rem"
            justifyContent="center"
            sx={{ marginLeft: '1.5rem' }}
          >
            <Typography variant="titleLarge">{event.title}</Typography>
            <Stack direction="row" spacing="1rem">
              <Typography variant="labelLarge">{event.date}</Typography>
              <Typography variant="labelLarge">
                {eventsService.getTimeString(event)}
              </Typography>
            </Stack>
            <Typography variant="labelMedium">{event.location}</Typography>
          </Stack>
        </Stack>
        <Typography
          variant="bodyMedium"
          sx={{ display: 'block', marginTop: '1rem !important' }}
        >
          {event.description}
        </Typography>
      </CardContent>
    )
  }

  return (
    <Card
      tabIndex={0}
      sx={{
        boxShadow:
          '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)',
        '&:hover': {
          boxShadow:
            '0px 2px 4px 0px rgba(52, 61, 62, 0.1), 0px 4px 8px 2px rgba(52, 61, 62, 0.1)',
        },
      }}
    >
      <CardActionArea href={`/event/${event.id}`}>
        {tabletScreen ? <TabletCard /> : <MobileAndDesktopCard />}
      </CardActionArea>
    </Card>
  )
}

export default CardEvent
