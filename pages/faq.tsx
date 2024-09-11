/*
* faq.tsx
* @2024 Digital Aid Seattle
*/
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

import {
  AddOutlined,
  LanguageOutlined,
  CalendarTodayOutlined,
  HandshakeOutlined,
  SettingsOutlined,
  FlightTakeoffOutlined,
  HelpOutlineOutlined
} from '@mui/icons-material';

import FaqImage from '../assets/faq.png'

import MastheadWithImage from 'components/MastheadWithImage'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { designColor } from 'theme/theme'

import { DASFaq } from 'types'
import { faqService } from './api/FaqService'

import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useFeature } from './api/FeatureService'

const FaqPage = () => {
  const faqFeature = useFeature('faq');
  const router = useRouter();

  const { setLoading } = useContext(LoadingContext)
  const [faqSections, setFaqSections] = useState<DASFaq[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (faqFeature && faqFeature.status === 'fetched') {
      if (faqFeature.data) {
        if (!initialized) {
          setLoading(true)
          faqService
            .getAll()
            .then((data) => {
              setFaqSections(data)
              setInitialized(true)
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
        }
      } else {
        console.log(`FAQ feature not implemented.`);
        router.push('/404')
      }
    }
  }, [faqFeature, router, initialized, setLoading])

  const FaqSection = ({ backgroundColor, textAlignment, children }) => (
    <SectionContainer backgroundColor={backgroundColor}>
      <Stack
        gap={{ xs: '64px', md: '80px' }}
        sx={{
          alignItems: textAlignment,
          textAlign: textAlignment,
        }}
        maxWidth={'880px'}
      >
        {children}
      </Stack>
    </SectionContainer>
  )

  const FaqHeroSection = () => {
    const theme = useTheme()
    const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
    return (
      <MastheadWithImage
        imageSrc={FaqImage.src}
        imageText="About Us page graphic"
      >
        <>
          <Typography
            variant={extraSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="headlineMedium"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Discover many ways to get involved with Digital Aid Seattle
          </Typography>
        </>
      </MastheadWithImage>
    )
  }

  const FaqCardSection = () => {

    const sectionIconMapping = {
      'generalInfo': LanguageOutlined,
      'volunteeringCommitment': CalendarTodayOutlined,
      'involvementOpportunities': HandshakeOutlined,
      'projectAndTeamStructure': SettingsOutlined,
      'onboardingProcess': FlightTakeoffOutlined,
      'additionalQuestions': HelpOutlineOutlined,
      // a fallback icon
      'default': HelpOutlineOutlined
    }

    return (
      <FaqSection backgroundColor={designColor.white} textAlignment="center">
        <Typography variant="headlineLarge" component="h2">
          Frequently Asked Questions
        </Typography>
        <Typography variant="bodyLarge">
          Find answers to common questions quickly and efficiently. Whether
          you&apos;re considering volunteering with Digital Aid Seattle (DAS) or
          looking for more information about our organization and processes,
          this section provides the essential details you need.
        </Typography>
        <CardRowContainer>
          {faqSections.map((section) => {
            const MuiIcon = sectionIconMapping[section.name] || sectionIconMapping['default'];
            return (
              <CardOne
                key={section._id}
                title={section.title}
                description={section.description || ''}
                cardHref={`#${section.name}`}
                icon={
                  <MuiIcon
                    style={{ color: designColor.white, fontSize: '40px' }}
                  />
                }
              />)
          }
          )}
        </CardRowContainer>
      </FaqSection>
    )
  }

  const FaqQuestionSection = () => {
    return (
      <FaqSection backgroundColor={designColor.white} textAlignment="left">
        {faqSections.map((section) => (
          <Stack sx={{ gap: '2rem' }} key={section._id}>
            <Typography
              variant="headlineLarge"
              id={section.name}
              // styles are for offsetting the sticky header when jumped to from anchor link
              sx={{ paddingTop: '6rem', marginTop: '-6rem' }}>
              {section.title}
            </Typography>
            <Box sx={{ display: 'block' }}>
              {section.qandas &&
                section.qandas.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<AddOutlined sx={{ color: designColor.black }} />}
                      id={`question-${index}-header`}
                      aria-controls={`question-${index}-content`}
                      sx={{
                        paddingLeft: '0px',
                        paddingRight: '0px',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                      }}>
                      <Typography variant="titleLarge">
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="bodyLarge">{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          </Stack>
        ))}
      </FaqSection>
    )
  }
  return (
    <BlockComponent block={!initialized}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <FaqHeroSection />
        <FaqCardSection />
        <FaqQuestionSection />
      </Container>
    </BlockComponent>
  )
}

export default withBasicLayout(FaqPage)
