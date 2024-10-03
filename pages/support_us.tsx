/**
 * support_us.tsx
 * @2024 Digital Aid Seattle
 */
import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import CardQuote from 'components/cards/CardQuote'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, withBasicLayout } from 'components/layouts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import SupportUsImage from '../assets/supportUs.png'
import dillonOlearyImage from '../assets/dillon_oleary.jpeg'
import silviniafigueroaImage from '../assets/silvinia_figueroa.jpeg'
import YuliaBalenkoImage from '../assets/Yulia_Balenko.jpg'
import VenmoImage from '../assets/venmo.png'

import { useFeature } from './api/FeatureService'
import MastheadWithImage from 'components/MastheadWithImage'

const LABELS = {
  hero_title: 'Support us',
  donate_title: 'Donate now',
  donate_button: 'Download the check donation form',
  impact_title: 'What people say about us',
  donate_with: 'Donate with'
}

const QUOTES = [
  {
    title: 'Amazing',
    quote: "Don't forget that once you're working with DAS, you're part of an amazing community of professionals. Meet the community through the social events and Slack and don't be shy to proposing events for the community.",
    avatar: dillonOlearyImage.src,
    person: "Dillon O'Leary",
    role: 'Volunteer'
  },
  {
    title: 'Professionals',
    quote: "Remember that you're volunteering inside an organization with other professionals who also believe in the DAS's mission. We're a pool of professionals alike with the same goals. If you have a question or need something, this is the place to do it.",
    avatar: silviniafigueroaImage.src,
    person: 'Silvina Figueroa',
    role: 'Volunteer'
  },
  {
    title: 'Enrichment',
    quote: "Volunteering with DAS not only provides hands-on experience in a variety of industries, helping you discover new passions or career paths, but it also broadens your perspective by allowing you to collaborate with diverse groups.",
    avatar: YuliaBalenkoImage.src,
    person: 'Yulia Balenko',
    role: 'Volunteer'
  }
]

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

  const WhatPeopleSaySection = ({ theme }) => (
    <SupportUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.impact_title}
      </Typography>
      <CardRowContainer>
        {QUOTES.map((info, idx) =>
          <CardQuote
            key={'q-' + idx}
            title={info.title}
            description={info.quote}
            avatar={info.avatar}
            person={info.person}
            role={info.role}
          />)}
      </CardRowContainer>
    </SupportUsSection>
  )

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
              onClick={() => window.open('/donation-form.pd', '_blank')}>{LABELS.donate_button}</Button>

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
