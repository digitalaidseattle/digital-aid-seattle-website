import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

type CardEventProps = {
  title: string
  date: string
  time: { start: string; end: string }
  location: string
  description: string
  buttonLink: string
  imageSrc: string
  imageAlt: string
}

const CardEvent = ({
  title,
  date,
  time,
  location,
  description,
  buttonLink,
  imageSrc,
  imageAlt,
}: CardEventProps) => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  if (extraSmallScreen || largeScreen) {
    return (
      <Card>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: '0', sm: '1.5rem' }}
        >
          <Box
            sx={{
              position: 'relative',
              border: '2px solid #EAF1F1',
              height: { xs: '0', sm: '20rem' },
              width: { xs: '100%', sm: '20rem' },
              paddingBottom: { xs: '100%', sm: '0' },
              flexShrink: { xs: '0', sm: '1', md: '0' },
              margin: { xs: '0', sm: '2rem 0 2rem 2rem' },
              minWidth: { xs: '0', sm: '50%', md: '0' },
            }}
          >
            <CardMedia
              component="img"
              alt={imageAlt}
              image={imageSrc}
              sx={{
                position: { xs: 'absolute', sm: 'static' },
                height: '100%',
                borderRadius: '8px',
              }}
            />
          </Box>
          <CardContent
            sx={{
              padding: { xs: '2rem 1rem 1rem 1rem', sm: '2rem 2rem 2rem 0' },
              paddingBottom: { xs: '1rem !important', sm: '2rem !important' },
            }}
          >
            <Stack justifyContent="center" sx={{ height: '100%' }}>
              <Stack spacing="1rem">
                <Typography variant="titleLarge">{title}</Typography>
                <Stack direction="row" spacing="1rem">
                  <Typography variant="labelLarge">{date}</Typography>
                  <Typography variant="labelLarge">
                    {time.start} - {time.end}
                  </Typography>
                </Stack>
                <Typography variant="labelMedium">{location}</Typography>
              </Stack>

              <Typography
                variant="bodyMedium"
                sx={{ display: 'block', marginTop: '1.5rem' }}
              >
                {description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: { xs: '2rem', md: '2.5rem' },
                  textAlign: 'center',
                  maxWidth: { xs: '100%', sm: 'min-content' },
                }}
                href={buttonLink}
              >
                RVSP
              </Button>
            </Stack>
          </CardContent>
        </Stack>
      </Card>
    )
  } else {
    // smallScreen (tablet)
    return (
      <Card>
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
                alt={imageAlt}
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
              <Typography variant="titleLarge">{title}</Typography>
              <Stack direction="row" spacing="1rem">
                <Typography variant="labelLarge">{date}</Typography>
                <Typography variant="labelLarge">
                  {time.start} - {time.end}
                </Typography>
              </Stack>
              <Typography variant="labelMedium">{location}</Typography>
            </Stack>
          </Stack>
          <Typography
            variant="bodyMedium"
            sx={{ display: 'block', marginTop: '1rem !important' }}
          >
            {description}
          </Typography>
          <Button
            variant="contained"
            href={buttonLink}
            sx={{
              maxWidth: 'min-content',
              display: 'block',
              marginTop: '2rem',
            }}
          >
            RVSP
          </Button>
        </CardContent>
      </Card>
    )
  }
}

export default CardEvent
