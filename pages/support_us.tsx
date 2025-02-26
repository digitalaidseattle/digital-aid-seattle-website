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
import { useContext, useEffect, useState } from 'react'
import SupportUsImage from '../assets/supportUs.png'
import VenmoImage from '../assets/venmo.png'
import PaypalImage from '../assets/paypal.png'

import { useFeature } from '../services/FeatureService'
import MastheadWithImage from 'components/MastheadWithImage'
import { testimonialService } from '../services/TestimonialService'
import { DASTestimonial } from 'types'
import { urlForImage } from '../sanity/lib/image'

const LABELS = {
  hero_title: 'Support us',
  donate_title: 'Donate now',
  donate_button: 'Download the check donation form',
  impact_title: 'What people say about us',
  donate_with: 'Donate with',
}

const COPY = {
  hero_description:
    'Donate to Digital Aid Seattle and fuel our mission to uplift nonprofits with essential digital tools to support communities and create lasting change.',
  donate_instructions:
    'We currently accept tax-deductible donations by mail, as well as through Venmo and PayPal.',
  mail_instructions:
    'You can mail the form and your check to us at the following address:',
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

const WhatPeopleSaySection = ({ theme }) => {
  const { setLoading } = useContext(LoadingContext)
  const [testimonials, setTestimonials] = useState<DASTestimonial[]>([])

  useEffect(() => {
    setLoading(true)
    testimonialService
      .getActiveTestimonials()
      .then((ts) =>
        setTestimonials(
          ts.sort((t1, t2) => t1.orderRank.localeCompare(t2.orderRank)),
        ),
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
    <SupportUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.impact_title}
      </Typography>
      <CardRowContainer>
        {testimonials.map((info, idx) => (
          <CardQuote
            key={'q-' + idx}
            title={info.title}
            description={info.quote}
            avatar={
              urlForImage(info.avatar)
                ? urlForImage(info.avatar).url()
                : undefined
            }
            person={info.name}
            role={info.role}
          />
        ))}
      </CardRowContainer>
    </SupportUsSection>
  )
}

const SupportUsPage = () => {
  const theme = useTheme()
  const { data: supportUs } = useFeature('support-us')
  const router = useRouter()

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
            {LABELS.hero_title}
          </Typography>
          <Typography
            variant="bodyLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            {COPY.hero_description}
          </Typography>
        </>
      </MastheadWithImage>
    )
  }

  const DonateSection = ({ theme }) => (
    <SupportUsSection backgroundColor={theme.palette.background.white}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.donate_title}
      </Typography>
      <Stack gap="2rem" textAlign="left">
        <Typography variant="bodyLarge">{COPY.donate_instructions}</Typography>
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
              {COPY.mail_instructions}
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
              {LABELS.donate_button}
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
              {LABELS.donate_with}
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
              {LABELS.donate_with}
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
