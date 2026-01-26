/**
* Volunteers.tsx
*
* @2023 Digital Aid Seattle
*/

import {
  AddOutlined,
  EventAvailableOutlined,
  StarsOutlined,
  WorkHistoryOutlined
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MastheadWithImage from 'components/MastheadWithImage'
import RolesSection from 'components/RolesSection'
import CardOne from 'components/cards/CardOne'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { Section, Subheader } from 'components/style-utils'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { designColor } from 'theme/theme'
import { DASVolunteerRoleBasicInfo } from 'types'

import { pageCopyService } from 'services/PageCopyService'
import VolunteerImage from '../assets/volunteerWithUs.png'
import { dasVolunteerRoleService } from '../services/VolunteerRoleService'
import Markdown from 'react-markdown'

/* eslint-disable @next/next/no-img-element */

const LABELS = {
  HERO_TITLE: 'Volunteer with us',
  HERO_TXT: 'Join Digital Aid Seattle to make a difference in the lives of others! We have a wide range of volunteer opportunities available.',
  VOLUNTEER_TITLE: 'Current Volunteer Openings',
  VOLUNTEER_TXT: 'All of our volunteers are vetted for experience, and sign a volunteer agreement before commencing work with Digital Aid Seattle.',
  EXPECTATION_SKILL_TITLE: 'Skill',
  EXPECTATION_SKILL_TXT: 'You demonstrate proficiency in your craft and operate with both autonomy and transparency.',
  EXPECTATIONS_TITLE: 'Our expectations',
  EXPECTATION_EXPERIENCE_TITLE: 'Experience',
  EXPECTATION_EXPERIENCE_TXT: 'You are a seasoned professional, capable of leading yourself and others in your discipline.',
  EXPECTATION_AVAILABILITY_TITLE: 'Availability',
  EXPECTATION_AVAILABILITY_TXT: 'You dedicate 4 hours a week for at least 6 months to accomplish your committed tasks with Digital Aid Seattle.',
  OATH_TITLE: 'Our oath',
  OATH_TXT: 'We champion these values and ask you as a volunteer to adopt them too.',
  PROCESS_TITLE: 'The process',
  PROCESS_STEP_1_TXT: 'Read our *[oath](#oath)* and *[policies](https://digital-aid-seattle.gitbook.io/digital-aid-seattle/Hk6Veo0mrttAEbFlZg18/hr-policies)*, then apply to volunteer using the button below.',
  PROCESS_STEP_2_TXT: 'You will receive an invitation for an interview within a few days.',
  PROCESS_STEP_3_TXT: 'If accepted, complete the onboarding and start engaging with the Digital Aid Seattle community.',
  PROCESS_STEP_4_TXT: 'Contribute weekly to your project, and make a difference for your community!',
  APPLY_TITLE: 'Interested in volunteering with Digital Aid Seattle?',
  APPLY_BTN: 'Apply to volunteer',

  OATH_SERVE_TITLE: 'Serve wholeheartedly.',
  OATH_SERVE_TXT:
    'I will selflessly fulfill the needs identified by our partners, the glamorous and the mundane. I will gladly handle any necessary tasks, both analog and digital.',
  OATH_SUPPORT_TITLE: 'Prioritize support.',
  OATH_SUPPORT_TXT:
    'I will always begin by asking how I can be of assistance, placing the needs of the team and projects above personal ideas or approaches.',
  OATH_COLLABORATION_TITLE: 'Foster collaboration.',
  OATH_COLLABORATION_TXT:
    'Before initiating any work, I will explore existing projects, individuals, or organizations working in related fields. I will actively seek opportunities for collaboration and alignment whenever feasible.',
  OATH_CURIOSITY_TITLE: 'Embrace curiosity.',
  OATH_CURIOSITY_TXT:
    'I will ask "why" when faced with uncertainty, recognizing the inherent value in diverse perspectives, skills, and contributions from all team members.',
  OATH_LISTEN_TITLE: 'Listen intently.',
  OATH_LISTEN_TXT:
    'I will prioritize active listening, valuing the insights and ideas shared by others.',
  OATH_PRIVACY_TITLE: 'Uphold privacy standards.',
  OATH_PRIVACY_TXT:
    'I acknowledge the significance of maintaining the confidentiality of our internal data. I am committed to refraining from engaging in public discussions about ongoing projects, unless DAS explicitly endorses such discussions through published materials or media outlets.',
  OATH_SAFEGUARD_TITLE: 'Safeguard partner information.',
  OATH_SAFEGUARD_TXT:
    'I will safeguard our partners’ personal information, preserving any personal data encountered in my role as a Digital Aid Seattle volunteer. I will diligently apply reasonable security practices to protect the data I have access to.',
  OATH_COMMUNICATION_TITLE: 'Maintain open communication.',
  OATH_COMMUNICATION_TXT:
    'I will promptly notify Digital Aid Seattle of any changes in my availability, project status, or progress. Additionally, I will report any issues or updates to ensure transparency and effective coordination.',
  OATH_INCLUSIVITY_TITLE: 'Promote inclusivity.',
  OATH_INCLUSIVITY_TXT:
    'I will contribute to fostering an environment free from harassment and discrimination, upholding the principles of equality and respect. I will not engage in any form of discrimination.',
  OATH_COMPLY_TITLE: 'Comply and collaborate.',
  OATH_COMPLY_TXT:
    'I will comply with all applicable laws and adhere to the operating procedures set by our partners, promoting harmonious collaboration and mutual respect.',
  OATH_MISSION_TITLE: 'Uphold our mission.',
  OATH_MISSION_TXT:
    "I commit to understanding and upholding Digital Aid Seattle's mission, values, and development guidelines, aligning my actions with the organization's purpose.",
}

const VolunteerPage = () => {
  const [volunteerRoles, setVolunteerRoles] = useState<DASVolunteerRoleBasicInfo[]>([])
  const { setLoading } = useContext(LoadingContext);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      setLoading(true);

      Promise.all([
        dasVolunteerRoleService.getAllActiveRoles(),

        pageCopyService
          .updateCopy(LABELS, 'volunteers')
      ])
        .then((resps) => {
          setVolunteerRoles(resps[0]);
          setInitialized(true);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [initialized, setLoading]);

  const theme = useTheme()
  const palette = theme.palette
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [oathValuesExpanded, setOathValuesExpanded] = React.useState<
    string | false
  >(false)
  const handleOathValuesChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setOathValuesExpanded(newExpanded ? panel : false)
    }

  const rolesSection = () => {

    const rolesContext = [
      {
        title: LABELS.EXPECTATION_SKILL_TITLE,
        description: LABELS.EXPECTATION_SKILL_TXT,
        icon: <StarsOutlined sx={{ color: palette.text.secondary }} fontSize="large" />
      },
      {
        title: LABELS.EXPECTATION_EXPERIENCE_TITLE,
        description: LABELS.EXPECTATION_EXPERIENCE_TXT,
        icon: <WorkHistoryOutlined sx={{ color: palette.text.secondary }} fontSize="large" />
      },
      {
        title: LABELS.EXPECTATION_AVAILABILITY_TITLE,
        description: LABELS.EXPECTATION_AVAILABILITY_TXT,
        icon: <EventAvailableOutlined sx={{ color: palette.text.secondary }} fontSize="large" />
      },

    ];

    return <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        textAlign: 'center',
        paddingY: { xs: 4, md: 8 },
        paddingX: { xs: '1rem', md: '2rem', lg: 0 },
      }}
      maxWidth={'880px'}
    >
      <RolesSection title={LABELS.VOLUNTEER_TITLE} showLink={true} showFilters={true} roles={volunteerRoles} />

      <Typography variant="bodyLarge">
        {LABELS.VOLUNTEER_TXT}
      </Typography>

      <Typography variant="headlineLarge">{LABELS.EXPECTATIONS_TITLE}</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: '2rem',
        }}
      >
        {rolesContext.map((cont, idx) =>
          <CardOne
            key={'card-' + idx}
            title={cont.title}
            icon={cont.icon}
            description={cont.description}
          />
        )}
      </Box>
    </Stack>
  }

  const oathAndValuesSection = () => {
    const oathContent = [
      { label: LABELS.OATH_SERVE_TITLE, content: LABELS.OATH_SERVE_TXT },
      { label: LABELS.OATH_SUPPORT_TITLE, content: LABELS.OATH_SUPPORT_TXT },
      { label: LABELS.OATH_COLLABORATION_TITLE, content: LABELS.OATH_COLLABORATION_TXT },
      { label: LABELS.OATH_CURIOSITY_TITLE, content: LABELS.OATH_CURIOSITY_TXT },
      { label: LABELS.OATH_LISTEN_TITLE, content: LABELS.OATH_LISTEN_TXT },
      { label: LABELS.OATH_PRIVACY_TITLE, content: LABELS.OATH_PRIVACY_TXT },
      { label: LABELS.OATH_SAFEGUARD_TITLE, content: LABELS.OATH_SAFEGUARD_TXT },
      { label: LABELS.OATH_COMMUNICATION_TITLE, content: LABELS.OATH_COMMUNICATION_TXT },
      { label: LABELS.OATH_INCLUSIVITY_TITLE, content: LABELS.OATH_INCLUSIVITY_TXT },
      { label: LABELS.OATH_COMPLY_TITLE, content: LABELS.OATH_COMPLY_TXT },
      { label: LABELS.OATH_MISSION_TITLE, content: LABELS.OATH_MISSION_TXT }
    ]

    return (
      (
        <SectionContainer backgroundColor={designColor.white}>
          <Stack
            id="oath"
            gap={{ xs: 4, md: 8 }}
            sx={{
              textAlign: 'left',
              width: { xs: '100%', lg: '880px' },
              maxWidth: '880px',
            }}
          >
            <Typography variant="headlineLarge" component="h2">
              {LABELS.OATH_TITLE}
            </Typography>
            <Typography variant="bodyLarge">
              {LABELS.OATH_TXT}
            </Typography>
            <Box sx={{ display: 'block' }}>
              {oathContent.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={oathValuesExpanded === `${index}`}
                  onChange={handleOathValuesChange(`${index}`)}
                >
                  <AccordionSummary
                    expandIcon={<AddOutlined sx={{ color: designColor.black }} />}
                    aria-controls={`volunteer-values${index}-content`}
                    id={`volunteer-values${index}-header`}
                    sx={{
                      paddingLeft: '0px',
                      paddingRight: '0px',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                    }}
                  >
                    <Typography variant="titleLarge" component="h3">
                      {item.label}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="bodyLarge">{item.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Stack>
        </SectionContainer>
      )
    )
  }

  const processSection = () => {

    const processContent = [
      LABELS.PROCESS_STEP_1_TXT,
      LABELS.PROCESS_STEP_2_TXT,
      LABELS.PROCESS_STEP_3_TXT,
      LABELS.PROCESS_STEP_4_TXT
    ]

    return (
      (
        <SectionContainer backgroundColor={designColor.background}>
          <Stack
            gap={{ xs: 4, md: 8 }}
            sx={{
              width: { xs: '100%', lg: '880px' },
              maxWidth: '880px',
            }}
          >
            <Typography variant="headlineLarge" component="h2">
              {LABELS.PROCESS_TITLE}
            </Typography>
            <ol>
              {processContent.map((item, index) => (
                <li key={index + 1} style={{ marginBottom: '2rem' }}>
                  <Typography
                    variant="titleLarge"
                    color={palette.primary.main}
                  >{`${index + 1}. `}</Typography>
                  <Markdown
                    components={{
                      p: ({ children }) => <>{children}</>
                    }}
                  >
                    {item}
                  </Markdown>
                </li>
              ))}
            </ol>
          </Stack>
        </SectionContainer>
      )
    )
  }

  const volunteerApplication = () => {
    return <SectionContainer backgroundColor={designColor.white}>
      <Section>
        <Subheader>
          <Typography
            variant={isSmallScreen ? 'headlineMedium' : 'headlineLarge'}
          >
            {LABELS.APPLY_TITLE}
          </Typography>
        </Subheader>

        <Link
          href="https://airtable.com/embed/appTn3HE53SyGqWTJ/shr1lbcr3qmkoIbNW"
          target='_blank'
          passHref
        >
          <Button variant="contained" color="primary">
            {LABELS.APPLY_BTN}
          </Button>
        </Link>
      </Section>
    </SectionContainer>
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <MastheadWithImage
        imageSrc={VolunteerImage.src}
        imageText="Volunteer graphic"
      >
        <>
          <Typography
            variant={isSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            {LABELS.HERO_TITLE}
          </Typography>
          <Typography
            variant="headlineLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            component="span"
          >
            {LABELS.HERO_TXT}
          </Typography>
        </>
      </MastheadWithImage>
      <BlockComponent block={!initialized}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {rolesSection()}
          {oathAndValuesSection()}
          {processSection()}
          {volunteerApplication()}
        </Box>
      </BlockComponent>
    </Container>
  )
}

export default withBasicLayout(VolunteerPage)
