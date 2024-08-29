/*
 * @2024 Digital Aid Seattle
 */
import { Button, Container, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import CardQuote from 'components/cards/CardQuote'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, withBasicLayout } from 'components/layouts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Placeholder from '../assets/placeholder-person.png'
import SupportUsImage from '../assets/supportUs.png'

import { useFeature } from './api/FeatureService'
import MastheadWithImage from 'components/MastheadWithImage'

const LABELS = {
  hero_title: 'Support us',
  donate_title: 'Donate now',
  donate_button: 'Download the check donation form',
  impact_title: 'What people say about us'
}

const QUOTES = [
  {
    title: 'Inspirational',
    quote: 'Volunteering with DAS has been truly inspirational, as it’s shown me the profound impact we can make together.',
    avatar: Placeholder.src,
    person: 'Ella Grayson',
    role: 'Volunteer'
  },
  {
    title: 'Transformative',
    quote: 'The support from DAS has been transformative, helping us achieve goals we never thought possible.',
    avatar: Placeholder.src,
    person: 'Liam Mercer',
    role: 'Partner'
  },
  {
    title: 'Impactful',
    quote: 'My contributions to DAS have been incredibly impactful, directly fueling meaningful change in the nonprofit sector.',
    avatar: undefined,
    person: 'Bashir Muhammad',
    role: 'Partner'
  }
]

const COPY = {
  hero_description: 'Donate to Digital Aid Seattle and fuel our mission to uplift non-profits with essential digital tools to support communities and create lasting change.',
  donate_instructions: 'We currently accept donations by mail. Please download and complete the check donation form. You can mail the form and your check to us at the following address:',
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

  const AboutUsSection = ({ backgroundColor, children }) => (
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
      <Stack gap="2rem">
        <Typography variant="bodyLarge" align="left">
          {COPY.donate_instructions}
        </Typography>
        <Typography variant="bodyLarge" align="left">
          {ADDRESS.title},<br />{ADDRESS.street},<br />{ADDRESS.statezip}
        </Typography>
        <a href="/document.pdf" target="_blank">
          <Button variant="contained" sx={{ width: 'fit-content' }}>{LABELS.donate_button}</Button>
        </a>
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
