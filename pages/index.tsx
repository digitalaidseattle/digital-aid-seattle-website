import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import CardOne from 'components/cards/CardOne'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'

import CardGridContainer from 'components/cards/CardGridContainer'
import HeroLines from '../public/images/homeHeroLines.svg'
import HeroLinesMobile from '../public/images/homeHeroLinesMobile.svg'
import HeroImage from '../public/images/SeattleSkyline.jpg'
import { useEffect, useState } from 'react'
import { pageCopyService } from 'services/PageCopyService'

// TODO consider moving into Sanity
const LABELS = {
  HERO_TXT: 'Building the free tech tools Puget Sound nonprofits need to have greater impact.',
  MISSION_LBL: 'Our mission',
  MISSION_TXT: 'We believe community organizations are the heart of Seattle, and deserve the same tools and advantages enjoyed by our largest tech companies. Our mission is to create scalable, customized solutions to enable other nonprofits to reach their full potential and achieve their own mission-driven goals.',
  LEARN_BTN: 'Learn About Us',
  PARTNER_DESC: 'Reach out to Digital Aid Seattle! We work with Washington-based nonprofits to create customized digital solutions for free.',
  PARTNER_BTN: 'Partner With Us',
  VOLUNTEER_DESC: 'Join Digital Aid Seattle to make a difference in the lives of others—we have a wide range of volunteer opportunities available.',
  VOLUNTEER_BTN: 'Volunteer With Us'
}

const Home = () => {
  const theme = useTheme()
  const palette = theme.palette

  const loader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}\?w=${width}&q=${quality || 75
      }`
  }

  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      pageCopyService
        .updateCopy(LABELS, 'home')
        .then(() => setInitialized(true))
    }
  }, [initialized]);

  return (
    <>
      {/* Hero Container */}
      <Box
        sx={{
          backgroundColor: palette.primary.main,
          display: 'flex',
          minHeight: '650px',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          padding: { xs: '1rem 0 1rem 0', md: '4rem 0 4rem 0' },
        }}
      >
        {/* SVG Linework Container */}
        <Box
          sx={{
            position: 'absolute',
            width: { xs: '100%', md: '2321px' },
            left: { xs: 0, md: '50%' },
            top: { xs: 0, md: '50%' },
            transform: {
              md: 'translate(-50%, -50%)',
            },
            opacity: 0.4,
            mixBlendMode: 'overlay',
            objectFit: 'fill',
          }}
        >
          {isMediumScreen ? (
            <img src={HeroLinesMobile.src} alt="" style={{ width: '100%' }} />
          ) : (
            <img src={HeroLines.src} alt="" style={{}} />
          )}
        </Box>
        {/* Hero Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: '64px', md: '87px', lg: 4 },
            alignItems: 'center',
            textAlign: { xs: 'center', lg: 'left' },
            paddingX: { xs: '16px', md: '32px', lg: 0 },
            paddingBottom: { xs: '64px', lg: '8rem' },
          }}
          maxWidth={'880px'}
        >
          {/* Heading and CTA Buttons */}
          <Box
            sx={{
              width: { xs: '100%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: { xs: 3, sm: '64px' },
              alignItems: { xs: 'center', lg: 'flex-start' },
              textAlign: { xs: 'center', lg: 'left' },
            }}
          >
            <Typography
              color={'text.secondary'}
              sx={{}}
              variant={isMediumScreen ? 'displaySmall' : 'displayMedium'}
            >
              {LABELS.HERO_TXT}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, sm: 4 },
                flexDirection: { xs: 'column', lg: 'row' },
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                href={'/partners'}
              >
                {LABELS.PARTNER_BTN}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  backgroundColor: '#004138',
                  marginBottom: { xs: '32px', md: '0px' },
                }}
                href={'/volunteers'}
              >
                {LABELS.VOLUNTEER_BTN}
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
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: { xs: '275px', md: '424px' },
                  height: { xs: '275px', md: '424px' },
                  zIndex: 1,
                }}
              >
                <img
                  src={HeroImage.src}
                  title="Seattle skyline by Stephen Plopper"
                  alt=""
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
                  mixBlendMode: 'overlay',
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
      </Box>
      <SectionContainer backgroundColor={palette.background.default}>
        <Stack
          sx={{
            gap: { xs: 3, lg: 10 },
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: { sm: 4, lg: 10 },
          }}
          maxWidth={'880px'}
        >
          <Typography variant="headlineLarge" component="h2">
            {LABELS.MISSION_LBL}
          </Typography>
          <Typography
            variant={isMediumScreen ? 'bodyMedium' : 'bodyLarge'}
            textAlign={'center'}
          >
            {LABELS.MISSION_TXT}
          </Typography>
          <Button
            variant="contained"
            href={'/about'}
            sx={{
              backgroundColor: palette.primary.dark,
              marginBottom: { sm: 4, lg: 10 },
            }}
          >
            {LABELS.LEARN_BTN}
          </Button>
          <CardGridContainer columns={2}>
            <CardOne
              description={LABELS.PARTNER_DESC}
              buttonText={LABELS.PARTNER_BTN}
              buttonLink="/partners"
              icon={
                <HandshakeOutlinedIcon
                  fontSize="large"
                  sx={{ color: palette.text.secondary }}
                />
              }
            />
            <CardOne
              description={LABELS.VOLUNTEER_DESC}
              buttonText={LABELS.VOLUNTEER_BTN}
              buttonLink="/volunteers"
              icon={
                <Groups2OutlinedIcon
                  fontSize="large"
                  sx={{ color: palette.text.secondary }}
                />
              }
            />

            {
              // Disabling until we implement a support-us page
              /* <CardOne
              description="Support Digital Aid Seattle in its mission to build tech solutions for our community nonprofits by donating."
              buttonText="Support Us"
              icon={
                <VolunteerActivismOutlinedIcon
                  fontSize="large"
                  sx={{ color: palette.text.secondary }}
                />
              }
            /> */
            }
          </CardGridContainer>
        </Stack>
      </SectionContainer>
    </>
  )
}

export default withBasicLayout(Home)
