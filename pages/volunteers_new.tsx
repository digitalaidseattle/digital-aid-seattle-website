import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  List,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

import { withBasicLayout } from 'components/layouts'
// import { ListItemWithIcon } from 'components/list/ListItemWithIcon'

import VolunteerImage from '../assets/volunteerWithUs.png'
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

import CardRowContainer from 'components/cards/CardRowContainer'
import CardOne from 'components/cards/CardOne'

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
  { label: 'Assume positive intent.', content: 'test' },
  { label: 'Bring out the best in others.', content: 'test' },
  { label: 'Start with the partner.', content: 'test' },
  { label: 'Focus on the problems not the solutions.', content: 'test' },
  { label: 'Sense of urgency and teamwork', content: 'test' },
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
    <>
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
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Volunteer With Us
            </Typography>
            <Typography
              variant="headlineLarge"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Join Open Seattle to make a difference in the lives of others! We
              have a wide range of volunteer opportunities available.
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }} maxWidth={'422px'}>
            <img
              src={VolunteerImage.src}
              alt="Volunteer page graphic"
              style={{ objectFit: 'cover' }}
            ></img>
          </Box>
        </Box>
      </Container>
      <Container>
        <Stack gap={8} sx={{ textAlign: 'center', padding: 1, paddingY: 8 }}>
          <Typography variant="headlineLarge">
            How you can participate
          </Typography>
          {/* <Grid columns={{ xs: 1, md: 2 }}> */}
          {/* <List>
          <ListItemWithIcon listIcon={<CodeBracketIcon />} listText="Front-end Development" />
        </List> */}
          {/* {gridContent.map((item) => (
            <ListItemWithIcon
              key={item.label}
              listIcon={item.icon}
              listText={item.label}
            />
          ))} */}
          {/* </Grid> */}
          <Typography variant="bodyLarge">
            All of our volunteers are vetted for experience, and sign a
            volunteer agreement before commencing work with Open Seattle.
          </Typography>
          <Typography variant="headlineLarge">
            Volunteer Expectations
          </Typography>
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
      <Container sx={{ backgroundColor: 'white' }}>
        <Stack gap={8} sx={{ textAlign: 'center', padding: 1, paddingY: 8 }}>
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
          <Button variant="contained" color="primary">
            Read Our Volunteer Agreement
          </Button>
        </Stack>
      </Container>
      <Container>
        <Typography variant="headlineLarge">The Process</Typography>
        <ol>
          {processContent.map((item, index) => (
            <li key={index + 1}>
              <Typography variant="titleLarge" color={palette.primary.main}>{`${
                index + 1
              }. `}</Typography>
              <Typography variant="bodyLarge">{item}</Typography>
            </li>
          ))}
        </ol>
      </Container>
      <Container sx={{ backgroundColor: 'white' }}>
        <Stack gap={8} sx={{ paddingY: 8 }}>
          <Typography variant="headlineLarge">
            Interested in volunteering with OpenSeattle?
          </Typography>
          <Button variant="contained" color="primary">
            Apply to Volunteer
          </Button>
        </Stack>
      </Container>
    </>
  )
}

export default withBasicLayout(VolunteerPage)
