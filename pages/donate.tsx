/**
 * support_us.tsx
 * @2024 Digital Aid Seattle
 */
import {
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

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import IconButton from '@mui/material/IconButton'
import MastheadWithImage from 'components/MastheadWithImage'
import Slider from 'react-slick'
import { pageCopyService } from 'services/PageCopyService'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { DASTestimonial } from 'types'
import { urlForImage } from '../sanity/lib/image'
import { useFeature } from '../services/FeatureService'
import { testimonialService } from '../services/TestimonialService'

const LABELS = {
  HERO_TITLE: 'Support us',
  HERO_TXT:
    'Donate to Digital Aid Seattle and fuel our mission to uplift nonprofits with essential digital tools to support communities and create lasting change.',
  DONATE_TITLE: 'Donate now',
  DONATE_BTN: 'Download the check donation form',
  IMPACT_TITLE: 'What people say about us',
  DONATE_WITH: 'Donate with',
  MAILING_INSTRUCTIONS:
    "We're currently accepting your tax deductible donations by mail and directly through Venmo. You can mail the form and your check to us at the following address:",
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

const WhatPeopleSaySection: React.FC<{ theme: any }> = ({ theme }) => {
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

  const SupportUsHeroSection = () => {
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

  const DonateSection = ({ theme }) => (
    <SupportUsSection backgroundColor={theme.palette.background.white}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.DONATE_TITLE}
      </Typography>
      <Stack gap="2rem" textAlign="left">
        <Typography variant="bodyLarge">
          {LABELS.MAILING_INSTRUCTIONS}
        </Typography>
      </Stack>

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
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <Stack gap="1rem" textAlign="left" sx={{ width: '100%' }}>
            <Typography variant="bodyLarge">
              {LABELS.MAILING_INSTRUCTIONS}
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
            alignItems: 'center',
            flex: '1 1 300px',
            maxWidth: '350px',
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <Stack gap="1rem" textAlign="center" sx={{ width: '100%' }}>
            <Typography variant="bodyLarge">or donate through</Typography>
            <Button
              variant="outlined"
              onClick={() =>
                window.open('https://venmo.com/DASeattle', '_blank')
              }
              sx={{
                backgroundColor: '#FFFFFF',
              }}
            >
              {LABELS.DONATE_WITH}
              <img
                style={{ marginLeft: '1rem' }}
                src={VenmoImage.src}
                alt="Venmo wordmark"
                width="100px"
              />
            </Button>
            <Button
              variant="outlined"
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
              {LABELS.DONATE_WITH}
              <img
                style={{ marginLeft: '1rem' }}
                src={PaypalImage.src}
                alt="Paypal wordmark"
                width="95px"
              />
            </Button>
          </Stack>
        </Box>
      </Box>
    </SupportUsSection>
  )

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
          <DonateSection theme={theme} />
          <WhatPeopleSaySection theme={theme} />
        </Container>
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(SupportUsPage)
