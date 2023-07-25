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
import { withBasicLayout } from 'components/layouts'
import ListItemWithIcon from 'components/list/ListItemWithIcon'
import Link from 'next/link'
import SectionContainer from 'components/layout/SectionContainer'

import VolunteerImage from '../assets/volunteerWithUs.png'
import { designColor } from 'theme/theme'

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
  { label: 'Assume positive intent.', content: 'Needs Content' },
  { label: 'Bring out the best in others.', content: 'Needs Content' },
  { label: 'Start with the partner.', content: 'Needs Content' },
  {
    label: 'Focus on the problems not the solutions.',
    content: 'Needs Content',
  },
  { label: 'Sense of urgency and teamwork', content: 'Needs Content' },
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
      <SectionContainer backgroundColor={theme.palette.primary.main}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: '40px' },
          }}
          maxWidth={'880px'}
        >
          <Box
            sx={{
              textAlign: 'left',
              width: '100%',
              maxWidth: '418px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem  ',
            }}
          >
            <Typography
              variant={isSmallScreen ? 'displaySmall' : 'displayLarge'}
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
          </Box>
          <img
            src={VolunteerImage.src}
            alt="Volunteer page graphic"
            width="418px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </SectionContainer>
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
        <Typography variant="headlineLarge">Volunteer Expectations</Typography>
        <CardRowContainer>
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
        </CardRowContainer>
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
          <Link href="/volunteer-agreement" passHref>
            <Button variant="contained" color="primary">
              Read Our Volunteer Agreement
            </Button>
          </Link>
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
