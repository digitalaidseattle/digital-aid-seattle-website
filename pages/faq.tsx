/**
 * faq.tsx
 * 
 * @2024 Digital Aid Seattle
 * 
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
  useTheme,
} from '@mui/material'

import {
  AddOutlined,
  LanguageOutlined,
  CalendarTodayOutlined,
  HandshakeOutlined,
  SettingsOutlined,
  FlightTakeoffOutlined,
  HelpOutlineOutlined,
  VolunteerActivismOutlined
} from '@mui/icons-material';

import FaqImage from '../assets/faq.png'

import { withBasicLayout, LoadingContext, BlockComponent } from 'components/layouts'
import MastheadWithImage from 'components/MastheadWithImage'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { designColor } from 'theme/theme'

import { DASFaq, DASQandA } from 'types'
import { faqService } from './api/FaqService'

import { useState, useEffect, useContext } from 'react'
import { useFeature } from './api/FeatureService';
import Markdown from 'react-markdown';

const FaqPage = () => {
  const faqFeature = useFeature('faq');
  const [initialized, setInitialized] = useState<boolean>(false);

  const [faqSections, setFaqSections] = useState<DASFaq[]>([])
  const { setLoading } = useContext(LoadingContext)

  const [faqSectionExpanded, setFaqSectionExpanded] = useState<string | false>(false);

  const handleFaqSectionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setFaqSectionExpanded(newExpanded ? panel : false)
    }

  useEffect(() => {
    if (faqFeature && faqFeature.status === 'fetched') {
      if (faqFeature.data) {
        if (!initialized) {
          setLoading(true)
          faqService
            .getAll()
            .then((data) => {
              setFaqSections(data.sort((f1: DASFaq, f2: DASFaq) => f1.orderRank.localeCompare(f2.orderRank)));
              setInitialized(true);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
        }
      }
    }
  }, [faqFeature, initialized, setLoading])

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
      'additionalQuestions': VolunteerActivismOutlined,
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
                smallerTitle
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

  const FaqQuestion = (questionItem: DASQandA, sectionName, index) => {
    return (
      <Accordion
        key={sectionName + index}
        expanded={faqSectionExpanded === sectionName + index}
        onChange={handleFaqSectionChange(sectionName + index)}
      >

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
            {questionItem.question}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Markdown className='markdown'>{questionItem.answer}</Markdown>
        </AccordionDetails>
      </Accordion>
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
                section.qandas.map((item, index) => FaqQuestion(item, section.name, index))}
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
