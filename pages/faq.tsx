import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { AddOutlined, VolunteerActivismOutlined } from '@mui/icons-material'

import AboutUsImage from '../assets/aboutUs.png'

import { withBasicLayout, LoadingContext } from 'components/layouts'
import MastheadWithImage from 'components/MastheadWithImage'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { designColor } from 'theme/theme'

import { DASFaq, DASQandA } from 'types'
import { faqService } from './api/FaqService'

import { useState, useEffect, useContext } from 'react'

const FaqPage = () => {
  const [faqSections, setFaqSections] = useState<DASFaq[]>([])
  const { setLoading } = useContext(LoadingContext)
  const theme = useTheme()

  const [expandedQuestion, setExpandedQuestion] = useState<number | boolean>(false);

  const handleExpandedQuestionChange =
  (questionId: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedQuestion(newExpanded ? questionId : false)
  }

  useEffect(() => {
    setLoading(true)
    faqService
      .getAll()
      .then((data) => setFaqSections(data))
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

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
        imageSrc={AboutUsImage.src}
        imageText="About Us page graphic"
      >
        <>
          <Typography
            variant={extraSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            FAQ
          </Typography>
          <Typography
            variant="bodyLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Find answers to all your questions
          </Typography>
        </>
      </MastheadWithImage>
    )
  }

  const FaqCardSection = () => {
    return (
      <FaqSection backgroundColor={designColor.white} textAlignment="center">
        <Typography variant="headlineLarge" component="h2">
          Frequently Asked Questions
        </Typography>
        <Typography variant="bodyLarge">
          Find answers to common questions quickly and efficiently. Whether
          you're considering volunteering with Digital Aid Seattle (DAS) or
          looking for more information about our organization and processes,
          this section provides the essential details you need.
        </Typography>
        <CardRowContainer>
          {faqSections.map((section) => (
            <CardOne
              title={section.title}
              description={section.description || ''}
              icon={
                // placeholder icon
                <VolunteerActivismOutlined
                  style={{ color: designColor.white, fontSize: '40px' }}
                />
              }
            />
          ))}
        </CardRowContainer>
      </FaqSection>
    )
  }

  const FaqQuestionSection = () => {
    return (
      <FaqSection backgroundColor={designColor.white} textAlignment="left">
        {faqSections.map((section) => (
          <Stack sx={{ gap: '2rem' }}>
            <Typography variant="headlineLarge">{section.title}</Typography>
            <Box sx={{ display: 'block' }}>
            {section.qandas &&
              section.qandas.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expandedQuestion === index}
                  onChange={handleExpandedQuestionChange(index)}>
                  <AccordionSummary
                    expandIcon={<AddOutlined sx={{ color: designColor.black }} />}
                    id={`question-${index}-header`}
                    sx={{
                      paddingLeft: '0px',
                      paddingRight: '0px',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                    }}>
                    <Typography variant="headlineMedium">
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
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <FaqHeroSection />
      <FaqCardSection />
      <FaqQuestionSection />
    </Container>
  )
}

export default withBasicLayout(FaqPage)
