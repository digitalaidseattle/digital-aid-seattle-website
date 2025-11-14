/**
 * support_us.tsx
 * 
 * @2025 Digital Aid Seattle
 */
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardQuote from 'components/cards/CardQuote'
import SectionContainer from 'components/layout/SectionContainer'
import {
  BlockComponent,
  LoadingContext,
  withBasicLayout,
} from 'components/layouts'
import { useRouter } from 'next/router'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import PaypalImage from '../assets/paypal.png'
import SupportUsImage from '../assets/supportUs.png'
import VenmoImage from '../assets/venmo.png'

import { AutoGraphOutlined, BoltOutlined, PhonelinkOutlined, VolunteerActivismOutlined } from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import IconButton from '@mui/material/IconButton'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardOne, { ICON_STYLE } from 'components/cards/CardOne'
import MastheadWithImage from 'components/MastheadWithImage'
import Slider from 'react-slick'
import { pageCopyService } from 'services/PageCopyService'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { DASTestimonial } from 'types'
import { urlForImage } from '../sanity/lib/image'
import { useFeature } from '../services/FeatureService'
import { testimonialService } from '../services/TestimonialService'

import AWSLogo from '../assets/aboutUsIcons/aws.png'
import CityOfSeattleLogo from '../assets/aboutUsIcons/cityofseattle.png'
import GoogleLogo from '../assets/aboutUsIcons/google.svg'
import MicrosoftLogo from '../assets/aboutUsIcons/microsoft.svg'
import SlalomLogo from '../assets/aboutUsIcons/slalom.png'

const LABELS = {
  HERO_TITLE: 'Support Digital Aid Seattle',
  HERO_TXT:
    'Donate to Digital Aid Seattle and fuel our mission to uplift nonprofits with essential digital tools to support communities and create lasting change.',
  DONATE_TITLE: 'Your donation powers digital transformation for nonprofits across our community',
  DONATE_TEXT: 'Every dollar you contribute helps us provide essential digital tools and expertise to local nonprofits, amplifying their impact and helping them serve more people in need.',
  DONATE_BTN: 'Download the check donation form',
  IMPACT_TITLE: 'What people say about us',
  DONATE_WITH: 'Donate with',

  WHY_SUPPORT_TITLE: 'Why Your Support Matters',
  WHY_SUPPORT_TEXT: 'When you donate to Digital Aid Seattle, you invest in the entire nonprofit ecosystem. Your contribution helps us:',
  WHY_CAPACITY_TITLE: 'Build capacity',
  WHY_CAPACITY_TEXT: 'for organizations doing critical community work',
  WHY_BRIDGE_TITLE: 'Bridge the digital divide',
  WHY_BRIDGE_TEXT: 'by providing modern tools and training',
  WHY_MULTIPLY_TITLE: 'Multiply impact',
  WHY_MULTIPLY_TEXT: 'through technology that helps nonprofits reach more people',
  WHY_CREATE_TITLE: 'Create lasting change',
  WHY_CREATE_TEXT: 'with sustainable digital solutions',

  PAYMENT_TITLE: 'Ready to Make a Difference?',
  PAYMENT_TEXT: 'We currently accept tax-deductible donations by mail, as well as through Venmo and PayPal.',
  PAYMENT_INSTRUCTIONS: "Send your tax-deductible donation with the completed form to:",
  PAYMENT_BY_MAIL_TITLE: 'Donate by Mail',
  PAYMENT_ELETRONIC_TITLE: 'Donate through Venmo and PayPal',

  QUESTIONS_TITLE: 'Questions About Donating?',
  QUESTIONS_TEXT: 'Contact us at info@digitalaidseattle.org to learn more about how your contribution will be used or to discuss larger partnership opportunities.',

  ALLIES_LABEL: 'Our allies'
}

const ADDRESS = {
  title: 'Digital Aid Seattle',
  street: '301 Union St',
  pobox: 'PO Box 1765',
  statezip: 'Seattle, WA 98111',
}

// Custom arrow components with chevrons
interface ArrowProps {
  ariaLabel?: string
  sx?: SxProps
  children?: React.ReactNode
  onClick?: () => void
}

const Arrow: React.FC<ArrowProps> = ({ ariaLabel, sx, children, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: 'primary.main',
        bgcolor: 'background.paper',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          bgcolor: 'background.paper',
          opacity: 0.9,
        },
        width: { xs: 32, sm: 40 },
        height: { xs: 32, sm: 40 },
        ...sx,
      }}
      aria-label={ariaLabel}
    >
      {children}
    </IconButton>
  )
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Arrow
      sx={{ right: isMobile ? 'calc(50% - 180px)' : 'calc(50% - 480px)' }}
      ariaLabel='Next slide'
      onClick={onClick}>
      <ChevronRightIcon fontSize={isMobile ? 'small' : 'medium'} />
    </Arrow>
  )
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  return (
    <Arrow
      sx={{ left: isMobile ? 'calc(50% - 180px)' : 'calc(50% - 480px)' }}
      ariaLabel='Previous slide'
      onClick={onClick}>
      <ChevronLeftIcon fontSize={isMobile ? 'small' : 'medium'} />
    </Arrow>
  )
}

const SupportUsSection: React.FC<{ backgroundColor: string, children: ReactNode }> = ({ backgroundColor, children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  return (<SectionContainer backgroundColor={backgroundColor}>
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        textAlign: 'center',
      }}
      width={isMobile ? theme.breakpoints.values.sm : theme.breakpoints.values.lg}
      maxWidth={'880px'}
    >
      {children}
    </Stack>
  </SectionContainer>
  )
}

const WhatPeopleSaySection = ({ }) => {
  const theme = useTheme();
  const { setLoading } = useContext(LoadingContext)
  const [testimonials, setTestimonials] = useState<DASTestimonial[]>([])

  useEffect(() => {
    setLoading(true)
    testimonialService
      .getActiveTestimonials()
      .then((data) =>
        setTestimonials(
          data.sort((a, b) => a.orderRank.localeCompare(b.orderRank))
        )
      )
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [setLoading])

  // Slider configuration with custom arrows and responsive settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <SupportUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.IMPACT_TITLE}
      </Typography>
      <Slider {...settings}>
        {testimonials.map((t, idx) => (
          <Box
            id={`testimonial-${idx}`}
            key={idx}
            sx={{
              padding: '2rem',
            }}
          >
            <CardQuote
              avatar={urlForImage(t.avatar).url()}
              title={t.title}
              description={t.quote}
              role={t.role}
              person={t.name}
            />
          </Box>
        ))}
      </Slider>
    </SupportUsSection >
  )
}

const SupportUsHeroSection = () => {
  const theme = useTheme();

  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <MastheadWithImage
      imageSrc={SupportUsImage.src}
      imageText="Support Us page graphic"
    >
      <>
        <Typography
          variant={extraSmallScreen ? 'displayMedium' : 'displayLarge'}
          sx={{ color: theme.palette.primary.contrastText }}
          component="h1"
        >
          {LABELS.HERO_TITLE}
        </Typography>
        <Typography
          variant="bodyLarge"
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          {LABELS.HERO_TXT}
        </Typography>
      </>
    </MastheadWithImage>
  )
}

const PaymentSection = () => {
  const theme = useTheme();
  return (
    <SupportUsSection backgroundColor={theme.palette.background.paper}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.PAYMENT_TITLE}
      </Typography>
      <Typography variant="bodyLarge">
        {LABELS.PAYMENT_TEXT}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {/* Mail Donation Box */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1 1 300px',
            maxWidth: '350px',
            backgroundColor: theme.palette.background.default,
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <Stack gap="1rem" sx={{ width: '100%' }}>
            <Typography variant="titleSmall" component="h2">
              {LABELS.PAYMENT_BY_MAIL_TITLE}
            </Typography>
            <Typography textAlign="left" variant="bodyLarge">
              {LABELS.PAYMENT_INSTRUCTIONS}
              <br />
              <br />
              {ADDRESS.title}
              <br />
              {ADDRESS.street}
              <br />
              {ADDRESS.pobox}
              <br />
              {ADDRESS.statezip}
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open('/donation-form.pdf', '_blank')}
            >
              {LABELS.DONATE_BTN}
            </Button>
          </Stack>
        </Box>
        {/* Paypal/Venmo Box */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex: '1 1 300px',
            maxWidth: '350px',
            backgroundColor: theme.palette.background.default,
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <Stack gap={'2rem'} sx={{ width: '100%' }}>
            <Typography variant="titleSmall" component="h2">
              {LABELS.PAYMENT_ELETRONIC_TITLE}
            </Typography>
            <Button
              onClick={() =>
                window.open(
                  'https://www.paypal.com/ncp/payment/DKSC68ZSN3EWJ',
                  '_blank'
                )
              }
              sx={{
                backgroundColor: '#FFB02E',
              }}
            >
              <img
                style={{ marginLeft: '1rem' }}
                src={PaypalImage.src}
                alt="Paypal wordmark"
                width="95px"
              />
            </Button>
            <Typography variant="bodyLarge">Or</Typography>
            <Button
              variant="outlined"
              onClick={() =>
                window.open('https://venmo.com/DASeattle', '_blank')
              }
              sx={{
                backgroundColor: '#FFFFFF',
              }}
            >
              <img
                style={{ marginLeft: '1rem' }}
                src={VenmoImage.src}
                alt="Venmo wordmark"
                width="100px"
              />
            </Button>
          </Stack>
        </Box>
      </Box>
    </SupportUsSection>
  )
}

const DonateSection = () => {
  const theme = useTheme();
  return (
    <SupportUsSection backgroundColor={theme.palette.background.paper}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.DONATE_TITLE}
      </Typography>
      <Typography variant="bodyLarge">
        {LABELS.DONATE_TEXT}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
      </Box>
    </SupportUsSection>
  )
}

const QuestionsSection = () => {
  const theme = useTheme();
  return (
    <SupportUsSection backgroundColor={theme.palette.background.paper}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.QUESTIONS_TITLE}
      </Typography>
      <Typography variant="bodyLarge">
        {LABELS.QUESTIONS_TEXT}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
      </Box>
    </SupportUsSection>
  )
}

const WhySupportSection = () => {
  const theme = useTheme();

  const whySupportContent = [{
    title: LABELS.WHY_CAPACITY_TITLE,
    description: LABELS.WHY_CAPACITY_TEXT,
    icon: <VolunteerActivismOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.WHY_BRIDGE_TITLE,
    description: LABELS.WHY_BRIDGE_TEXT,
    icon: <PhonelinkOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.WHY_MULTIPLY_TITLE,
    description: LABELS.WHY_MULTIPLY_TEXT,
    icon: <BoltOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.WHY_CREATE_TITLE,
    description: LABELS.WHY_CREATE_TEXT,
    icon: <AutoGraphOutlined style={ICON_STYLE} />,
  },
  ]

  return (
    <SupportUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.WHY_SUPPORT_TITLE}
      </Typography>
      <Typography variant="bodyLarge">
        {LABELS.WHY_SUPPORT_TEXT}
      </Typography>
      <CardGridContainer columns={4}>
        {whySupportContent.map((item) => (
          <CardOne
            smallerTitle
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </CardGridContainer>
    </SupportUsSection>)
}

const AlliesSection: React.FC = () => {

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

const SupportUsPage = () => {
  const theme = useTheme()
  const { data: supportUs } = useFeature('support-us')
  const router = useRouter()
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized) {
      pageCopyService
        .updateCopy(LABELS, 'support_us')
        .then(() => setInitialized(true))
    }
  }, [initialized])

  useEffect(() => {
    if (supportUs !== undefined && supportUs === false) {
      console.error(`Support Us feature not implemented.`)
      router.push('/404')
    }
  }, [supportUs, router])


  return (
    <>
      <BlockComponent block={false}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SupportUsHeroSection />
          <DonateSection />
          <WhySupportSection />
          <PaymentSection />
          <WhatPeopleSaySection />
          <QuestionsSection />
          <AlliesSection />
        </Container>
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(SupportUsPage)
