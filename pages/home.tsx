import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined'
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import { withBasicLayout } from 'components/layouts'

import HeroLines from '../public/images/homeHeroLines.svg'
import HeroImage from '../public/images/seattle_4.jpg'

/* eslint-disable @next/next/no-img-element */

const Home = () => {
  const theme = useTheme()
  const palette = theme.palette

  const loader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}\?w=${width}&q=${
      quality || 75
    }`
  }

  const isMediumScreen = useMediaQuery('(max-Width:600px)')

  return (
    <>
      {/* Hero Container */}
      <Container 
        sx={{
          backgroundColor: palette.primary.light,
          display: 'flex',
          minHeight: '650px',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          padding: { xs: '1rem 0 1rem 0', md: '4rem 0 4rem 0' },
        }}
        maxWidth={false}
      >
        {/* SVG Linework Container */}
        <Box
          sx={{
            position: 'absolute',
            width: { xs: '200vh', sm: '100vw' },
            maxWidth: '1150px',
            height: 'auto',
            overflow: 'hidden',
            objectFit: 'cover',
            left: { xs: 0, sm: '50%' },
            top: { xs: 0, sm: '50%' },
            transform: {
              xs: 'rotate(90deg)translate(0, 50%)',
              sm: 'translate(-50%, -50%)',
            },
          }}
        >
          <img
            src={HeroLines.src}
            alt="Hero Lines"
            style={{ opacity: 0.4, objectFit: 'cover' }}
          />
        </Box>
        {/* Hero Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 12 },
            alignItems: 'center',
          }}
        >
          {/* Heading and CTA Buttons */}
          <Box
            sx={{
              width: { xs: '100%', md: '480px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: { xs: 3, sm: 5 },
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <Typography
              color={'text.secondary'}
              sx={{}}
              variant={isMediumScreen ? 'displaySmall' : 'displayLarge'}
            >
              Connecting Puget Sound nonprofits with free tech solutions.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, sm: 4 },
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button variant="contained" color="secondary" size="small">
                Get Help
              </Button>
              <Button variant="contained" color="primary" size="small">
                Volunteer With Us
              </Button>
            </Box>
          </Box>
          {/* Box for Image, circle, and shadows */}
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: { xs: 2, sm: 0 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Image Container */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: { xs: '275px', md: '424px' },
                  height: { xs: '275px', md: '424px' },
                  zIndex: 1,
                }}
              >
                <img
                  src={HeroImage.src}
                  alt="Seattle skyline by Stephen Plopper"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  borderRadius: '50%',
                  width: { xs: '295px', md: '480px' },
                  height: { xs: '295px', md: '480px' },
                  border: '4px solid rgba(248, 248, 248, 0.3)',
                }}
              />
              {/* Shading for image */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '125%',
                  height: '50%',
                  borderRadius: '50%',
                  background: 'rgba(184, 233, 122, 0.32)',
                  top: '55%',
                  filter: 'blur(100px)',
                  zIndex: 0,
                }}
              />
              {/* Shading for image */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '75%',
                  height: '25%',
                  borderRadius: '50%',
                  background: 'rgba(184, 233, 122, 0.32)',
                  top: '65%',
                  left: '-15%',
                  filter: 'blur(100px)',
                  transform: 'rotate(45deg)',
                  zIndex: 0,
                }}
              />
            </Box>
            {/* Shading for image */}
            <Box
              sx={{
                position: 'absolute',
                width: '75%',
                height: '25%',
                borderRadius: '50%',
                background: 'rgba(184, 233, 122, 0.32)',
                top: '65%',
                left: '40%',
                filter: 'blur(100px)',
                transform: 'rotate(-45deg)',
                zIndex: 0,
              }}
            />
          </Box>
        </Box>
      </Container>
      <Container
        sx={{ backgroundColor: palette.background.default }}
        maxWidth={false}
      >
        <Stack
          sx={{
            gap: { xs: 3, md: 5 },
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '3rem 0 3rem 0',
          }}
        >
          <Typography variant="headlineLarge">Our Mission</Typography>
          <Typography
            variant={isMediumScreen ? 'bodyMedium' : 'bodyLarge'}
            sx={{ width: '80%', maxWidth: '880px' }}
          >
            We believe community organizations are the heart of Seattle, and
            deserve the same tools and advantages enjoyed by our largest tech
            companies. Our mission is to create scalable, customized solutions
            to enable other nonprofits to reach their full potential and achieve
            their own mission-driven goals.
          </Typography>
          <Button variant="contained" color="primary">
            Learn About Us
          </Button>
          <CardRowContainer>
            <CardOne
              description="Reach out to Open Seattle! We work with Washington-based nonprofits to create customized digital solutions for free."
              buttonText="Partner With Us"
              icon={
                <HandshakeOutlinedIcon
                  fontSize="large"
                  sx={{ color: palette.text.secondary }}
                />
              }
            />
            <CardOne
              description="Join Open Seattle to make a difference in the lives of others—we have a wide range of volunteer opportunities available."
              buttonText="Volunteer With Us"
              icon={
                <Groups2OutlinedIcon
                  fontSize="large"
                  sx={{ color: palette.text.secondary }}
                />
              }
            />
            <CardOne
              description="Support Open Seattle in its mission to build tech solutions for our community nonprofits by donating."
              buttonText="Support Us"
              icon={
                <VolunteerActivismOutlinedIcon
                  fontSize="large"
                  sx={{ color: palette.text.secondary }}
                />
              }
            />
          </CardRowContainer>
        </Stack>
      </Container>
    </>
  )
}

export default withBasicLayout(Home)
