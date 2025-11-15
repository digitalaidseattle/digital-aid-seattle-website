/**
* Volunteers.tsx
*
* @2023 Digital Aid Seattle
*/

import {
  AddOutlined,
  ConnectWithoutContactOutlined,
  Diversity3Outlined,
  WorkspacePremiumOutlined
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
import CardOne, { ICON_STYLE } from 'components/cards/CardOne'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { Section, Subheader } from 'components/style-utils'
import Link from 'next/link'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { designColor } from 'theme/theme'
import { DASVolunteerRoleBasicInfo } from 'types'

import CardGridContainer from 'components/cards/CardGridContainer'
import { pageCopyService } from 'services/PageCopyService'
import VolunteerImage from '../assets/volunteerWithUs.png'
import { dasVolunteerRoleService } from '../services/VolunteerRoleService'

/* eslint-disable @next/next/no-img-element */

const LABELS = {
  HERO_TITLE: 'Digital Aid Seattle: Volunteer and Make a Difference',
  HERO_TXT: 'Join Digital Aid Seattle to make a difference in the lives of others! We have a wide range of volunteer opportunities available.',
  JOIN_TITLE: 'Join a Community of Changemakers',
  JOIN_TEXT: 'Do you have a passion for social good and a desire to use your skills to make a positive impact? Digital Aid Seattle offers a unique opportunity to volunteer alongside a talented and dedicated community.',

  MORE_TITLE: `More Than Just Volunteering - It's a Learning Experience`,
  MORE_TEXT: `We believe that volunteering shouldn't be a one-way street. While your skills and expertise are invaluable to our mission, we're also committed to your growth and development. As a Digital Aid Seattle volunteer, you'll gain:`,
  MORE_SKILLS_TITLE: 'New Skills',
  MORE_SKILLS_TEXT: 'Gain expertise in tech & digital.',
  MORE_NETWORKING_TITLE: 'Networking Opportunities',
  MORE_NETWORKING_TEXT: 'Connect with pros & nonprofits.',
  MORE_COMMUNITY_TITLE: 'Sense of Community',
  MORE_COMMUNITY_TEXT: 'Join a supportive, collaborative team.',

  VOLUNTEER_TITLE: 'Current Volunteer Openings',

  HAVE_ROLE_TITLE: 'We Have a Role for You!',
  HAVE_ROLE_TEXT: 'Digital Aid Seattle offers a wide range of volunteer opportunities to match your skills from tech gurus, grant writing wizards, marketing mavens, financial whizzes and many more. Check out our current volunteer openings section',

  PROCESS_TITLE: 'Ready to Join the Movement?',
  PROCESS_TEXT: `We're always looking for passionate individuals to join our team, with an approximate time commitment of 4 hours per week. Fits in your schedule? Here is how you can get started`,
  PROCESS_STEP_1_TXT: 'Read our oath, then apply to volunteer using the button below.',
  PROCESS_STEP_2_TXT: 'You will receive an invitation for an interview within a few days.',
  PROCESS_STEP_3_TXT: 'Once accepted, complete the onboarding and start engaging with the Digital Aid Seattle community.',
  PROCESS_STEP_4_TXT: 'Contribute weekly to your project, and make a difference for your community!',

  OATH_TITLE: 'Our oath',
  OATH_TEXT: `By embracing this pledge, you affirm your dedication to Digital Aid Seattle's mission and the principles it stands for.`,
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

  APPLY_TITLE: 'Interested in volunteering with Digital Aid Seattle?',
  APPLY_BTN: 'Apply to volunteer'
}

const BaseSection: React.FC<{ backgroundColor: string, children: ReactNode }> = ({ backgroundColor, children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  return (<SectionContainer backgroundColor={backgroundColor}>
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{ textAlign: 'center', }}
      width={isMobile ? theme.breakpoints.values.sm : theme.breakpoints.values.lg}
      maxWidth={'880px'}
    >
      {children}
    </Stack>
  </SectionContainer>
  )
}

const JoinSection = () => {
  const theme = useTheme();
  return (
    <BaseSection backgroundColor={theme.palette.background.paper}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.JOIN_TITLE}
      </Typography>
      <Typography variant="bodyLarge">
        {LABELS.JOIN_TEXT}
      </Typography>
    </BaseSection>
  )
}

const HaveRoleSection = () => {
  const theme = useTheme();
  return (
    <BaseSection backgroundColor={theme.palette.background.paper}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.HAVE_ROLE_TITLE}
      </Typography>
      <Typography variant="bodyLarge">
        {LABELS.HAVE_ROLE_TEXT}
      </Typography>
    </BaseSection>
  )
}

const ProcessSection = () => {
  const theme = useTheme();

  const processContent = [
    LABELS.PROCESS_STEP_1_TXT,
    LABELS.PROCESS_STEP_2_TXT,
    LABELS.PROCESS_STEP_3_TXT,
    LABELS.PROCESS_STEP_4_TXT
  ]
  return (
    <SectionContainer backgroundColor={designColor.background}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.PROCESS_TITLE}
      </Typography>

      <Stack
        gap={{ xs: 4, md: 8 }}
        sx={{
          marginTop: 3,
          textAlign: 'left',
          width: { xs: '100%', lg: '880px' },
          maxWidth: '880px',
        }}
      >
        <Typography variant="bodyMedium">
          {LABELS.PROCESS_TEXT}
        </Typography>
        <ol>
          {processContent.map((item, index) => (
            <li key={index + 1} style={{ marginBottom: '2rem' }}>
              <Typography
                variant="titleMedium"
                color={theme.palette.primary.main}
              >{`${index + 1}.`}</Typography>
              <Typography variant="bodySmall" mx={2}>
                {item}
              </Typography>
            </li>
          ))}
        </ol>
      </Stack>
    </SectionContainer>
  )
}

const MoreSection = () => {
  const theme = useTheme();

  const cardContent = [
    {
      title: LABELS.MORE_SKILLS_TITLE,
      description: LABELS.MORE_SKILLS_TEXT,
      icon: <WorkspacePremiumOutlined style={ICON_STYLE} />,
    },
    {
      title: LABELS.MORE_NETWORKING_TITLE,
      description: LABELS.MORE_NETWORKING_TEXT,
      icon: <ConnectWithoutContactOutlined style={ICON_STYLE} />,
    },
    {
      title: LABELS.MORE_COMMUNITY_TITLE,
      description: LABELS.MORE_COMMUNITY_TEXT,
      icon: <Diversity3Outlined style={ICON_STYLE} />,
    }
  ]

  return (
    <BaseSection backgroundColor={theme.palette.background.paper}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.MORE_TITLE}
      </Typography>
      <Typography variant="bodyLarge">
        {LABELS.MORE_TEXT}
      </Typography>
      <CardGridContainer columns={3}>
        {cardContent.map((item) => (
          <CardOne
            smallerTitle
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            cardStyles={{
              boxShadow: '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)'
            }}
          />
        ))}
      </CardGridContainer>
    </BaseSection>
  )
}


const VolunteerRolesSection = () => {
  const theme = useTheme();
  const { setLoading } = useContext(LoadingContext);

  const [volunteerRoles, setVolunteerRoles] = useState<DASVolunteerRoleBasicInfo[]>([])
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      setLoading(true);
      dasVolunteerRoleService.getAllActiveRoles()
        .then((resps) => {
          setVolunteerRoles(resps);
          setInitialized(true);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [initialized, setLoading]);

  return (
    <BaseSection backgroundColor={theme.palette.background.default}>
      <RolesSection title={LABELS.VOLUNTEER_TITLE} showLink={true} showFilters={false} roles={volunteerRoles} />
    </BaseSection>
  );
}

const VolunteerApplication = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)')

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


const OathAndValuesSection = () => {
  const [oathValuesExpanded, setOathValuesExpanded] = React.useState<string | false>(false);

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

  const handleOathValuesChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setOathValuesExpanded(newExpanded ? panel : false)
  }

  return (
    (
      <SectionContainer backgroundColor={designColor.white}>
        <Typography variant="headlineMedium" component="h2">
          {LABELS.OATH_TITLE}
        </Typography>

        <Stack
          gap={{ xs: 4, md: 8 }}
          sx={{
            marginTop: 3,
            textAlign: 'left',
            width: { xs: '100%', lg: '880px' },
            maxWidth: '880px',
          }}
        >
          <Typography variant="bodyMedium">
            {LABELS.OATH_TEXT}
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

const HeroSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (<MastheadWithImage
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
  </MastheadWithImage>);
}

const VolunteerPage = () => {
  const theme = useTheme();
  const { setLoading } = useContext(LoadingContext);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      setLoading(true);
      pageCopyService
        .updateCopy(LABELS, 'volunteers')
        .then(() => setInitialized(true))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [initialized, setLoading]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <HeroSection />
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
          <JoinSection />
          <MoreSection />
          <VolunteerRolesSection />
          <HaveRoleSection />
          <ProcessSection />
          <OathAndValuesSection />
          <VolunteerApplication />
        </Box>
      </BlockComponent>
    </Container>
  )
}

export default withBasicLayout(VolunteerPage)
