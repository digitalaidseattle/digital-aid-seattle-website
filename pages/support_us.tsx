/**
 * support_us.tsx
 * @2024 Digital Aid Seattle
 */
import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import CardQuote from 'components/cards/CardQuote'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import SupportUsImage from '../assets/supportUs.png'
import dillonOlearyImage from '../assets/dillon_oleary.jpeg'
import silviniafigueroaImage from '../assets/silvinia_figueroa.jpeg'
import YuliaBalenkoImage from '../assets/Yulia_Balenko.jpg'
import VenmoImage from '../assets/venmo.png'

import { useFeature } from './api/FeatureService'
import MastheadWithImage from 'components/MastheadWithImage'
import { testimonialService } from './api/TestimonialService'
import { DASTestimonial } from 'types'
import { urlForImage } from '../sanity/lib/image'

const LABELS = {
  hero_title: 'Support us',
  donate_title: 'Donate now',
  donate_button: 'Download the check donation form',
  impact_title: 'What people say about us',
  donate_with: 'Donate with'
}

const COPY = {
  hero_description: 'Donate to Digital Aid Seattle and fuel our mission to uplift non-profits with essential digital tools to support communities and create lasting change.',
  donate_instructions: 'We’re currently accepting your tax deductible donations by mail and directly through Venmo.  You can mail the form and your check to us at the following address:',
}

const ADDRESS = {
  title: 'Digital Aid Seattle',
  street: '107 Spring St',
  statezip: 'Seattle, WA 98104'
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

  const { setLoading } = useContext(LoadingContext);
  const [testimonials, setTestimonials] = useState<DASTestimonial[]>([])

  useEffect(() => {
    setLoading(true);
    testimonialService.getActiveTestimonials()
      .then(ts => setTestimonials(ts))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [setLoading]);

  return (
    <SupportUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.impact_title}
      </Typography>
      <CardRowContainer>
        {testimonials.map((info, idx) =>
          <CardQuote
            key={'q-' + idx}
            title={info.title}
            description={info.quote}
            avatar={urlForImage(info.avatar).url()}
            person={info.name}
            role={info.role}
          />)}
      </CardRowContainer>
    </SupportUsSection>
  )
}

const SupportUsPage = () => {
  const theme = useTheme()
  const { data: supportUs } = useFeature('support-us');
  const router = useRouter();

  useEffect(() => {
    if (supportUs !== undefined && supportUs === false) {
      console.error(`Support Us feature not implemented.`);
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
        <Typography variant="bodyLarge">
          {COPY.donate_instructions}
        </Typography>
        <Typography variant="bodyLarge">
          {ADDRESS.title}<br />{ADDRESS.street}<br />{ADDRESS.statezip}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack gap="1rem" textAlign="center" width="350px"
          >
            <Button variant="contained"
              onClick={() => window.open('/donation-form.pdf', '_blank')}>{LABELS.donate_button}</Button>

            <Typography fontWeight={700} >or</Typography>
            <Button variant="outlined"
              onClick={() => window.open('https://venmo.com/DASeattle', '_blank')}>
              {LABELS.donate_with}
              <img
                style={{ marginLeft: '1rem' }}
                src={VenmoImage.src}
                alt="Venmo wordmark"
                width="100px"
              />
            </Button>
          </Stack>
        </Box>
      </Stack>
    </SupportUsSection>
  )

  return (
    <>
      <BlockComponent block={false}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
