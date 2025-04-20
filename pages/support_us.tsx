/**
 * support_us.tsx
 * @2024 Digital Aid Seattle
 */
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardQuote from 'components/cards/CardQuote'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import {
  BlockComponent,
  LoadingContext,
  withBasicLayout,
} from 'components/layouts'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import SupportUsImage from '../assets/supportUs.png'
import VenmoImage from '../assets/venmo.png'
import PaypalImage from '../assets/paypal.png'

import { useFeature } from '../services/FeatureService'
import MastheadWithImage from 'components/MastheadWithImage'
import { testimonialService } from '../services/TestimonialService'
import { DASTestimonial } from 'types'
import { urlForImage } from '../sanity/lib/image'
import { pageCopyService } from 'services/PageCopyService'

const LABELS = {
  HERO_TITLE: 'Support us',
  HERO_TXT: 'Donate to Digital Aid Seattle and fuel our mission to uplift nonprofits with essential digital tools to support communities and create lasting change.',
  DONATE_TITLE: 'Donate now',
  DONATE_BTN: 'Download the check donation form',
  IMPACT_TITLE: 'What people say about us',
  DONATE_WITH: 'Donate with',
  MAILING_INSTRUCTIONS: 'We’re currently accepting your tax deductible donations by mail and directly through Venmo.  You can mail the form and your check to us at the following address:',
}

const ADDRESS = {
  title: 'Digital Aid Seattle',
  street: '107 Spring St',
  statezip: 'Seattle, WA 98104',
}

const SupportUsSection = ({ backgroundColor, children }) => (
  <SectionContainer backgroundColor={backgroundColor}>
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        textAlign: 'center',
      }}
      maxWidth={'880px'}
    >
      {children}
    </Stack>
  </SectionContainer>
)

const WhatPeopleSaySection: React.FC<{ theme: any }> = ({ theme }) => {
    const { setLoading } = useContext(LoadingContext)
    const [testimonials, setTestimonials] = useState<DASTestimonial[]>([])
    const [initialized, setInitialized] = useState(false)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        if (!initialized) {
            setLoading(true)
            testimonialService
                .getActiveTestimonials()
                .then((data) => {
                    setTestimonials(
                        data.sort((a, b) => a.orderRank.localeCompare(b.orderRank))
                    )
                    setInitialized(true)
                })
                .catch(console.error)
                .finally(() => setLoading(false))
        }
    }, [initialized, setLoading])

    // Slider configuration with custom arrows and responsive settings
    const settings = {
        dots: true,
        infinite: testimonials.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: false,
        centerMode: false,
        centerPadding: '0px',
    }

    return (
        <SupportUsSection backgroundColor={theme.palette.background.default}>
            <Typography variant="headlineMedium" component="h2">
                {LABELS.IMPACT_TITLE}
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    position: 'relative',
                    px: { xs: 4, sm: 2 },
                }}
            >
                <Slider {...settings}>
                    {testimonials.map((t, idx) => (
                        <div key={idx}>
                            <CardQuote
                                title={t.title}
                                description={t.quote}
                                avatar={urlForImage(t.avatar)?.url()}
                                person={t.name}
                                role={t.role}
                            />
                        </div>
                    ))}
                </Slider>
            </Box>
        </SupportUsSection>
    )
}

const SupportUsPage = () => {
  const theme = useTheme()
  const { data: supportUs } = useFeature('support-us')
  const router = useRouter()
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      pageCopyService
        .updateCopy(LABELS, 'support_us')
        .then(() => setInitialized(true))
    }
  }, [initialized]);

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
        <Typography variant="bodyLarge">{LABELS.MAILING_INSTRUCTIONS}</Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap', // Allows items to wrap on smaller screens
          width: '100%', // Takes full width of container
        }}
      >
        {/* Mail Donation Box */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1 1 300px', // Allows grow, shrink, and sets min width before wrap
            maxWidth: '350px',
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto', // Centers when wrapped
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
            flex: '1 1 300px', // Allows grow, shrink, and sets min width before wrap
            maxWidth: '350px',
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto', // Centers when wrapped
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
                  '_blank',
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
