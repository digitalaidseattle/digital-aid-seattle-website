import { NextPage } from 'next'
import Image from 'next/image'

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined'

import CardRowContainer from 'components/cards/CardRowContainer'
import CardOne from 'components/cards/CardOne'

import HeroLines from '../public/images/homeHeroLines.svg'
import HeroImage from '../public/images/seattle_4.jpg'

import CommonHeader from 'components/CommonHeader'

/* eslint-disable @next/next/no-img-element */

interface Props {}

const Home: NextPage<Props> = () => {
  const theme = useTheme()
  const palette = theme.palette

  const loader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}\?w=${width}&q=${
      quality || 75
    }`
  }

  const isMediumScreen = useMediaQuery('(max-Width:900px)')

  return (
    <>
      <CommonHeader />
      <Container
        sx={{
          height: isMediumScreen ? 'fit-content' : '95vh',
          minHeight: '575px',
          backgroundColor: palette.primary.light,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowX: 'hidden',
        }}
        maxWidth={false}
      >
        <Box
          sx={
            isMediumScreen
              ? {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '1200px',
                  height: 'auto',
                  objectFit: 'cover',
                  transform: 'rotate(90deg)translate(20%, 50%)',
                }
              : {
                  width: '100vw',
                  minWidth: '1200px',
                  height: 'auto',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  overflow: 'hidden',
                  transform: {
                    xs: 'rotate(90deg) translate(-50%,-50%)',
                    md: 'translate(-50%, -50%)',
                  },
                }
          }
        >
          <img
            src={HeroLines.src}
            alt="Hero Lines"
            style={{ opacity: 0.4, objectFit: 'cover' }}
          />
        </Box>
        <Box
          mt={10}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: { md: '480px', xs: '350px' },
              height: { md: '480px', xs: '350px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 5,
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              marginBottom: { xs: 7, md: 0 },
            }}
          >
            <Typography
              color={'text.secondary'}
              sx={{ maxWidth: { xs: '90%', md: '450px' } }}
              variant={isMediumScreen ? 'displaySmall' : 'displayLarge'}
            >
              Connecting Puget Sound nonprofits with free tech solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Button variant="contained" color="secondary">
                Get Help
              </Button>
              <Button variant="contained" color="primary">
                Volunteer With Us
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              width: { md: '480px', xs: '350px' },
              height: { md: '480px', xs: '350px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: isMediumScreen ? 10 : 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: { md: '424px', xs: '315px' },
                  height: { md: '424px', xs: '315px' },
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
                  width: { md: '480px', xs: '335px' },
                  height: { md: '480px', xs: '335px' },
                  border: '4px solid rgba(248, 248, 248, 0.3)',
                }}
              />
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
        <Box
          sx={{
            height: { xs: '450px', md: '536px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
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
        </Box>
      </Container>
      <Container
        sx={{
          backgroundColor: palette.background.default,
          paddingTop: '120px',
          paddingBottom: '120px',
        }}
        maxWidth={false}
      >
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
      </Container>
    </>
  )
}

export default Home
