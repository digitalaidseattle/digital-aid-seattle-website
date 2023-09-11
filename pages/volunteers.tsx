import {
  AddOutlined,
  Campaign,
  Code,
  DataObject,
  DrawOutlined,
  EventAvailableOutlined,
  Gavel,
  PeopleAlt,
  ScreenSearchDesktop,
  StarsOutlined,
  Storage,
  WorkHistoryOutlined,
} from '@mui/icons-material'
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
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
import ListItemWithIcon from 'components/list/ListItemWithIcon'
import Link from 'next/link'
import { designColor } from 'theme/theme'

import VolunteerImage from '../assets/volunteerWithUs.png'
import { ReactElement, ReactNode } from 'react'
import MastheadWithImage from 'components/MastheadWithImage'

/* eslint-disable @next/next/no-img-element */

const gridContent = [
  { label: 'Front-end Development', icon: <Code /> },
  { label: 'Data Science', icon: <Storage /> },
  { label: 'Back-end Development', icon: <DataObject /> },
  { label: 'Marketing', icon: <Campaign /> },
  { label: 'UX / UI Design', icon: <DrawOutlined /> },
  { label: 'Operations/Project Management', icon: <PeopleAlt /> },
  { label: 'UX Research', icon: <ScreenSearchDesktop /> },
  { label: 'Legal Counsel', icon: <Gavel /> },
]

const oathContent = [
  {
    label: 'Serve wholeheartedly.',
    content:
      'I will selflessly fulfill the needs identified by our partners, the glamorous and the mundane. I will gladly handle any necessary tasks, both analog and digital.',
  },
  {
    label: 'Prioritize support.',
    content:
      'I will always begin by asking how I can be of assistance, placing the needs of the team and projects above personal ideas or approaches.',
  },
  {
    label: 'Foster collaboration.',
    content:
      'Before initiating any work, I will explore existing projects, individuals, or organizations working in related fields. I will actively seek opportunities for collaboration and alignment whenever feasible.',
  },
  {
    label: 'Embrace curiosity.',
    content:
      'I will ask "why" when faced with uncertainty, recognizing the inherent value in diverse perspectives, skills, and contributions from all team members.',
  },
  {
    label: 'Listen intently.',
    content:
      'I will prioritize active listening, valuing the insights and ideas shared by others.',
  },
  {
    label: 'Uphold privacy standards.',
    content:
      'I acknowledge the significance of maintaining the confidentiality of our internal data. I am committed to refraining from engaging in public discussions about ongoing projects, unless OS explicitly endorses such discussions through published materials or media outlets.',
  },
  {
    label: 'Safeguard partner information.',
    content:
      'I will safeguard our partners’ personal information, preserving and personal data encountered in my role as an Open Seattle volunteer. I will diligently apply reasonable security practices to protect the data I have access to.',
  },
  {
    label: 'Maintain open communication.',
    content:
      'I will promptly notify Open Seattle of any changes in my availability, project status, or progress. Additionally, I will report any issues or updates to ensure transparency and effective coordination.',
  },
  {
    label: 'Promote inclusivity.',
    content:
      'I will contribute to fostering an environment free from harassment and discrimination, upholding the principles of equality and respect. I will not engage in any form of discrimination.',
  },
  {
    label: 'Comply and collaborate.',
    content:
      'I will comply with all applicable laws and adhere to the operating procedures set by our partners, promoting harmonious collaboration and mutual respect.',
  },
  {
    label: 'Uphold our mission.',
    content:
      "I commit to understanding and upholding Open Seattle's mission, values, and development guidelines, aligning my actions with the organization's purpose.",
  },
]

const processContent = [
  'Read our volunteer agreement, then apply to volunteer using the button below.',
  'You will receive an invitation for an interview within a few days.',
  'If accepted, complete onboarding and choose a project to work on.',
  'Contribute weekly to your project, and make a difference for your community!',
]

const VolunteerPage = () => {
  const theme = useTheme()
  const palette = theme.palette
  const isSmallScreen = useMediaQuery('(max-width:600px)')

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
          >
            Volunteer with us
          </Typography>
          <Typography
            variant="headlineLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Join Open Seattle to make a difference in the lives of others! We
            have a wide range of volunteer opportunities available.
          </Typography>
        </>
      </MastheadWithImage>
      {/* Volunteer Roles Section */}
      <Stack
        gap={{ xs: '64px', md: '80px' }}
        sx={{
          textAlign: 'center',
          paddingY: { xs: 4, md: 8 },
          paddingX: { xs: '1rem', md: '2rem', lg: 0 },
        }}
        maxWidth={'880px'}
      >
        <Typography variant="headlineLarge">How you can participate</Typography>
        <Grid container spacing={2}>
          {gridContent.map((item) => (
            <Grid item xs={12} md={6} key={item.label}>
              <ListItemWithIcon listIcon={item.icon} listText={item.label} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="bodyLarge">
          All of our volunteers are vetted for experience, and sign a volunteer
          agreement before commencing work with Open Seattle.
        </Typography>
        <Typography variant="headlineLarge">Our Expectations</Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: '2rem',
          }}
        >
          <CardOne
            title="Skill"
            icon={
              <StarsOutlined
                sx={{ color: palette.text.secondary }}
                fontSize="large"
              />
            }
            description="You demonstrate proficiency in your craft and operate with both autonomy and transparency."
          />
          <CardOne
            title="Experience"
            icon={
              <WorkHistoryOutlined
                sx={{ color: palette.text.secondary }}
                fontSize="large"
              />
            }
            description="You are a seasoned professional, capable of leading yourself and others in your discipline."
          />
          <CardOne
            title="Availability"
            icon={
              <EventAvailableOutlined
                sx={{ color: palette.text.secondary }}
                fontSize="large"
              />
            }
            description="You dedicate the time you need to accomplish your committed tasks with Open Seattle."
          />
        </Box>
      </Stack>
      {/* Oath & Values Section */}
      <SectionContainer backgroundColor={designColor.white}>
        <Stack
          gap={{ xs: 4, md: 8 }}
          sx={{
            textAlign: 'left',
            width: { xs: '100%', lg: '880px' },
            maxWidth: '880px',
          }}
        >
          <Typography variant="headlineLarge">Our Oath</Typography>
          <Typography variant="bodyLarge">
            We champion these values and ask you as a volunteer to adopt them,
            too.
          </Typography>
          <Box sx={{ display: 'block' }}>
            {oathContent.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<AddOutlined sx={{ color: designColor.black }} />}
                  aria-controls={`volunteer-values${index}-content`}
                  id={`volunteer-values${index}-header`}
                >
                  <Typography variant="titleLarge">{item.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="bodyLarge">{item.content}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Stack>
      </SectionContainer>
      {/* Process Section */}
      <SectionContainer backgroundColor={designColor.background}>
        <Stack
          gap={{ xs: 4, md: 8 }}
          sx={{
            width: { xs: '100%', lg: '880px' },
            maxWidth: '880px',
          }}
        >
          <Typography variant="headlineLarge">The Process</Typography>
          <ol>
            {processContent.map((item, index) => (
              <li key={index + 1} style={{ marginBottom: '2rem' }}>
                <Typography
                  variant="titleLarge"
                  color={palette.primary.main}
                >{`${index + 1}.`}</Typography>
                <Typography variant="bodyLarge" mx={2}>
                  {item}
                </Typography>
              </li>
            ))}
          </ol>
        </Stack>
      </SectionContainer>
      {/* Volunteer Application */}
      <SectionContainer backgroundColor={designColor.white}>
        <Stack
          gap={{ xs: 4, md: 8 }}
          sx={{
            textAlign: 'center',
            maxWidth: '880px',
            marginX: 'auto',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'headlineMedium' : 'headlineLarge'}
          >
            Interested in volunteering with Open Seattle?
          </Typography>
          <Link href="/volunteer-application" passHref>
            <Button variant="contained" color="primary">
              Apply to volunteer
            </Button>
          </Link>
        </Stack>
      </SectionContainer>
    </Container>
  )
}

export default withBasicLayout(VolunteerPage)
