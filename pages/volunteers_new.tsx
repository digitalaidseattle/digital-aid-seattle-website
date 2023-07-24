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
  useTheme,
} from '@mui/material'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import { withBasicLayout } from 'components/layouts'
import ListItemWithIcon from 'components/list/ListItemWithIcon'
import Link from 'next/link'

import VolunteerImage from '../assets/volunteerWithUs.png'

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
  'If you are accepted, the next step is to complete your onboarding and select a project to work on.',
  'Contribute weekly to your project, and make a difference for your community!',
]

const VolunteerPage = () => {
  const theme = useTheme()
  const palette = theme.palette

  return (
    <div>
      <Container
        sx={{
          backgroundColor: theme.palette.primary.main,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          paddingY: '5rem',
        }}
        maxWidth={false}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '50%', textAlign: 'left' }} maxWidth={'422px'}>
            <Typography
              variant="displayLarge"
              sx={{
                color: theme.palette.primary.contrastText,
                marginBottom: '2rem',
              }}
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
          <Box sx={{ width: '50%' }} maxWidth={'700px'}>
            <img
              src={VolunteerImage.src}
              alt="Volunteer page graphic"
              style={{ objectFit: 'cover' }}
            ></img>
          </Box>
        </Box>
      </Container>
      {/* Volunteer Roles Section */}
      <Container maxWidth="md">
        <Stack gap={8} sx={{ textAlign: 'center', paddingY: 8 }}>
          <Typography variant="headlineLarge">
            How you can participate
          </Typography>
          <Grid container spacing={2}>
            {gridContent.map((item) => (
              <Grid item xs={12} sm={6} key={item.label}>
                <ListItemWithIcon listIcon={item.icon} listText={item.label} />
              </Grid>
            ))}
          </Grid>
          <Typography variant="bodyLarge">
            All of our volunteers are vetted for experience, and sign a
            volunteer agreement before commencing work with Open Seattle.
          </Typography>
          <Typography variant="headlineLarge">Our expectations</Typography>
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
      </Container>
      {/* Oath & Values Section */}
      <Container
        sx={{ backgroundColor: 'white' }}
        maxWidth={false}
        disableGutters
      >
        <Stack
          gap={8}
          sx={{
            textAlign: 'center',
            paddingY: 8,
            maxWidth: 'md',
            marginX: 'auto',
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
                  expandIcon={<AddOutlined />}
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
      </Container>
      {/* Process Section */}
      <Container maxWidth={false}>
        <Stack
          gap={8}
          sx={{
            paddingY: 8,
            maxWidth: 'md',
            marginX: 'auto',
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
      </Container>
      {/* Volunteer Application */}
      <Container sx={{ backgroundColor: 'white' }} maxWidth={false}>
        <Stack
          gap={8}
          sx={{
            textAlign: 'center',
            paddingY: 8,
            maxWidth: 'md',
            marginX: 'auto',
          }}
        >
          <Typography variant="headlineLarge">
            Interested in volunteering with Open Seattle?
          </Typography>
          <Link href="/volunteer-application" passHref>
            <Button variant="contained" color="primary">
              Apply to volunteer
            </Button>
          </Link>
        </Stack>
      </Container>
    </div>
  )
}

export default withBasicLayout(VolunteerPage)
