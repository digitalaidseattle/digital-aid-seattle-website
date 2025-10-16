import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Avatar, Box, Button, Icon, Stack, Typography, useTheme } from '@mui/material'
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

import GoogleLogo from '../assets/aboutUsIcons/google.svg';
import MicrosoftLogo from '../assets/aboutUsIcons/microsoft.svg';
import SlalomLogo from '../assets/aboutUsIcons/slalom.png';
import CityOfSeattleLogo from '../assets/aboutUsIcons/cityofseattle.png';
import AWSLogo from '../assets/aboutUsIcons/aws.png';

// TODO consider moving into Sanity
const LABELS = {
  HERO_TXT:
    'We provide free technology support to help Seattle-based nonprofits thrive in the digital age.',
  MISSION_LBL: 'Our mission',
  MISSION_TXT:
    'We believe community organizations are the heart of Seattle, and deserve the same tools and advantages enjoyed by our largest tech companies. Our mission is to create scalable, customized solutions to enable other nonprofits to reach their full potential and achieve their own mission-driven goals.',
  LEARN_BTN: 'Learn about us',
  PARTNER_DESC:
    'Learn how your organization can benefit from our free tech support.',
  PARTNER_BTN: 'Partner with us',
  VOLUNTEER_DESC:
    'Make a difference by volunteering your time and expertise',
  VOLUNTEER_BTN: 'Volunteer with us',
  SUPPORT_US_DESC:
    'Support our mission by making a financial contribution.',
  SUPPORT_BTN: 'Support us',
  WHY_DAS_LABEL: 'Why Digital Aid Seattle?',
  WHY_DAS_SUBTITLE_LABEL: 'We believe in equitable technology',
  WHY_DAS_TEXT: 'Community organizations are the heartbeat of Seattle, yet too often lack the tools that drive efficiency, fundraising, and outreach. Digital Aid Seattle levels the playing field by delivering pro bono, scalable tech solutions built by local volunteers from U.S. top companies.',
  HOW_LABEL: 'How it works?',
  HOW_SUBTITLE_LABEL: 'If you’re a Washington-based, nonprofit organization, let’s talk.',
  PROJECT_TITLE: '2 Projects Deployed with 4+ Underway',
  PROJECT_TEXT: 'Websites, databases, mobile apps, and dashboards built for local nonprofits since 2023.',
  VOLUNTEERS_TITLE: '92 Volunteers',
  VOLUNTEERS_TEXT: 'Skilled professionals lending expertise so you don’t have to stretch your budget.',
  VALUE_TITLE: '$936,000 in Value',
  VALUE_TEXT: 'Pro-bono services that allow you to reallocate scarce funds back into programs.',
  IMPACT_LABEL: 'Our impact',
  LEARN_MORE_BTN: 'Learn more',
  ALLIES_LABEL: 'Our allies'
}

const HeroSection: React.FC = () => {
  const theme = useTheme()
  const palette = theme.palette
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
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
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                backgroundColor: '#004138',
                marginBottom: { xs: '32px', md: '0px' },
              }}
              href={'/support_us'}
            >
              {LABELS.SUPPORT_BTN}
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
                alt="Seattle skyline picture"
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
  );
}
const OurMissionSection: React.FC = () => {
  const theme = useTheme()
  const palette = theme.palette
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (<Stack
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

  </Stack>)
}

const OptionsSection: React.FC = () => {
  const theme = useTheme()
  const palette = theme.palette
  const cardStyles = {
    boxShadow: '0px 6px 12px 0px #5660611F'
  };
  return (
    <CardGridContainer columns={3}>
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
        cardStyles={cardStyles}
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
        cardStyles={cardStyles}
      />
      <CardOne
        description={LABELS.SUPPORT_US_DESC}
        buttonText={LABELS.SUPPORT_BTN}
        buttonLink="/support_us"
        icon={
          <VolunteerActivismIcon
            fontSize="large"
            sx={{ color: palette.text.secondary }}
          />
        }
        cardStyles={cardStyles}
      />
    </CardGridContainer>
  )
}

const WhyDASSection: React.FC = () => {
  return (<Stack
    sx={{
      gap: { xs: 3, lg: 10 },
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: { sm: 4, lg: 10 },
    }}
    maxWidth={'880px'}
  >
    <Typography variant="headlineLarge" component="h2">
      {LABELS.WHY_DAS_LABEL}
    </Typography>
    <Typography variant='labelLarge'>
      {LABELS.WHY_DAS_SUBTITLE_LABEL}
    </Typography>
    <Typography textAlign={'center'} >
      {LABELS.MISSION_TXT}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="small"
      href={'/partners'}
    >
      {LABELS.PARTNER_BTN}
    </Button>
  </Stack>)
}

const HowItWorksSection: React.FC = () => {
  const theme = useTheme()
  const palette = theme.palette
  const cardStyles = {
    backgroundColor: palette.text.secondary,
    boxShadow: '0px 6px 12px 0px #5660611F'
  };
  return (<Stack
    sx={{
      gap: { xs: 3, lg: 10 },
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: { sm: 4, lg: 10 },
    }}
    maxWidth={'880px'}
  >
    <Typography variant="headlineLarge" component="h2">
      {LABELS.HOW_LABEL}
    </Typography>
    <CardGridContainer columns={3}>
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
        cardStyles={cardStyles}
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
        cardStyles={cardStyles}
      />

      <CardOne
        description={LABELS.SUPPORT_US_DESC}
        buttonText={LABELS.SUPPORT_BTN}
        buttonLink="/support_us"
        icon={
          <VolunteerActivismIcon
            fontSize="large"
            sx={{ color: palette.text.secondary }}
          />
        }
        cardStyles={cardStyles}
      />
    </CardGridContainer>
    <Typography variant='labelLarge'>
      {LABELS.HOW_SUBTITLE_LABEL}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="small"
      href={'/partners'}
    >
      {LABELS.PARTNER_BTN}
    </Button>
  </Stack>)
}

const ImpactSection: React.FC = () => {
  const theme = useTheme()
  const palette = theme.palette
  const cardStyles = {
    backgroundColor: palette.text.secondary,
    boxShadow: '0px 6px 12px 0px #5660611F'
  };

  return (
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
        {LABELS.IMPACT_LABEL}
      </Typography>
      <CardGridContainer columns={3}>
        <CardOne
          title={LABELS.PROJECT_TITLE}
          smallerTitle={true}
          description={LABELS.PROJECT_TEXT}
          cardStyles={cardStyles}
        />
        <CardOne
          title={LABELS.VOLUNTEERS_TITLE}
          smallerTitle={true}
          description={LABELS.VOLUNTEERS_TEXT}
          cardStyles={cardStyles}
        />
        <CardOne
          title={LABELS.VALUE_TITLE}
          smallerTitle={true}
          description={LABELS.VALUE_TEXT}
          cardStyles={cardStyles}
        />
      </CardGridContainer>
      <Button
        variant="contained"
        color="primary"
        size="small"
        href={'/projects'}
      >
        {LABELS.LEARN_MORE_BTN}
      </Button>
    </Stack>
  );
}

const allies = [
  {
    label: 'google',
    icon: GoogleLogo.src,
  },
  {
    label: 'Microsoft',
    icon: MicrosoftLogo.src,
  },
  {
    label: 'Slalom',
    icon: SlalomLogo.src,
  },
  {
    label: 'City Of Seattle',
    icon: CityOfSeattleLogo.src,
  },
  {
    label: 'Amazon Web Services',
    icon: AWSLogo.src,
  },
]

const AlliesSection: React.FC = () => {
  return (
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
        {LABELS.ALLIES_LABEL}
      </Typography>
      <Stack direction={'row'} spacing={4} >
        {allies.map((item, index) => (
          <Avatar
            key={`logo-${index}`}
            alt={item.label}
            src={item.icon}
            sx={{ width: 124, height: 124 }} />
        ))}
      </Stack>
    </Stack>
  );
}

const Home = () => {
  const theme = useTheme()
  const palette = theme.palette
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      pageCopyService
        .updateCopy(LABELS, 'home')
        .then(() => setInitialized(true))
    }
  }, [initialized])

  return (
    <>
      {/* Hero Container */}
      <HeroSection />
      <SectionContainer backgroundColor={palette.background.default}>
        <OurMissionSection />
        <OptionsSection />
      </SectionContainer>
      <SectionContainer backgroundColor={palette.background.paper}>
        <WhyDASSection />
        <HowItWorksSection />
      </SectionContainer>
      <SectionContainer backgroundColor={palette.background.default}>
        <ImpactSection />
      </SectionContainer>
      <SectionContainer backgroundColor={palette.background.paper}>
        <AlliesSection />
      </SectionContainer>
    </>
  )
}

export default withBasicLayout(Home)
