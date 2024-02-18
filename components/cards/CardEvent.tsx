/*
 * @2024 Digital Aid Seattle
 */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { OSEvent } from 'types'
import { urlForImage } from '../../sanity/lib/image'
import { eventsService } from 'pages/api/EventsService'

type CardEventProps = {
  event: OSEvent
}

const CardEvent = ({ event }: CardEventProps) => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  const getButton = () => {
    const buttonSX = (extraSmallScreen || largeScreen)
      ? {
        marginTop: { xs: '2rem', lg: '2.5rem' },
        textAlign: 'center',
        maxWidth: { xs: '100%', lg: 'min-content' },
      }
      : {
        maxWidth: 'min-content',
        display: 'block',
        marginTop: '2rem',
      }

    if (event.details) {
      return (
        <Button
          variant="contained"
          sx={buttonSX}
          href={`/event?name=${event.id}`}
        >
          Learn More
        </Button>
      )
    }
    else
      if (event.rsvpLink) {
        return (
          <Button
            variant="contained"
            sx={buttonSX}
            href={event.rsvpLink}
          >
            RVSP
          </Button>
        )
      } else {
        return (
          <></>
        )
      }
  }

  if (extraSmallScreen || largeScreen) {
    return (
      <Card
        sx={{
          boxShadow:
            '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)',
        }}
      >
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
            {event.image && event.image.asset &&
              <CardMedia
                component="img"
                image={urlForImage(event.image).url()}
                sx={{
                  position: { xs: 'absolute', lg: 'static' },
                  height: '100%',
                }}
              />
            }
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
              {getButton()}
            </Stack>
          </CardContent>
        </Stack>
      </Card>
    )
  } else {
    // mediumScreen (tablet)
    return (
      <Card
        sx={{
          boxShadow:
            '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)',
        }}
      >
        <CardContent>
          <Stack direction="row">
            <Box
              sx={{
                position: 'relative',
                border: '2px solid #EAF1F1',
                height: '10rem',
                width: '10rem',
              }}>
              {event.image && event.image.asset &&
                <CardMedia
                  component="img"
                  image={urlForImage(event.image).url()}
                  sx={{
                    position: 'static',
                    height: '100%',
                    borderRadius: '8px',
                  }}
                />
              }
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
          {getButton()}
        </CardContent>
      </Card>
    )
  }
}

export default CardEvent
