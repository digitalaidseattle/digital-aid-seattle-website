/*
 * @2024 Digital Aid Seattle
 */
import { ReactNode, useEffect, useState } from 'react';

import { urlForImage } from '../sanity/lib/image';

import {
  Box,
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SectionContainer from 'components/layout/SectionContainer';

import { withBasicLayout } from 'components/layouts';
// icons for role cards
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Section, Subheader } from 'components/style-utils';
import { OSEvent } from 'types';
import { eventsService } from './api/EventsService';
import CardReservation from 'components/cards/CardReservation';
/*********/

const HeaderSection = (props: { event: OSEvent }) => {
  const theme = useTheme()
  const [event, setEvent] = useState<OSEvent>()
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  function MobileSection() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: '100%',
            height: '28.75rem',
            position: 'absolute',
            zIndex: '0',
          }}
        ></Box>
        <Stack
          spacing="2rem"
          sx={{
            position: 'relative',
            padding: '4rem 1rem 0rem 1rem',
            color: theme.palette.primary.contrastText,
          }}
        >
          <Stack>
            <Typography variant="headlineMedium" component="h2">
              Event
            </Typography>
            <Typography variant="displayMedium" component="h1">
              {event.title}
            </Typography>
            <Typography variant="headlineMedium" component="h2">
              {event.date}
            </Typography>
          </Stack>
          <Stack spacing="1rem">
            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">{event.partner}</Typography>
            </Stack>
          </Stack>

          <img
            src={urlForImage(event.image).url()}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              display: 'block',
              borderRadius: '20px',
              boxShadow:
                '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
            }}
          />
        </Stack>
      </>
    )
  }

  function DesktopSection() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            paddingTop: { md: '5.5rem', lg: '14.5rem' },
            paddingBottom: '1rem',
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              margin: '0 auto',
              maxWidth: '880px',
              paddingX: { xs: '1rem', md: '2rem', lg: '0' },
            }}>
            <Stack>
              <Typography
                variant={largeScreen ? 'headlineLarge' : 'headlineMedium'}
                component="h2" >
                Event
              </Typography>
              <Typography
                variant={largeScreen ? 'displayLarge' : 'displayMedium'}
                sx={{
                  width: { md: '40vw', lg: '25rem' },
                }}
                component="h1" >
                {event.title}
              </Typography>
              <Typography
                variant={largeScreen ? 'headlineLarge' : 'headlineMedium'}
                component="h2" >
                {event.date}
              </Typography>
            </Stack>

            <Box
              sx={{
                width: { md: 'min(40vw, 18rem)', lg: '25rem' },
                position: 'absolute',
                right: { xs: '1rem', md: '2rem', lg: '0' },
                bottom: '-6rem',
                zIndex: '2',
              }}
            >
              <img
                src={urlForImage(event.image).url()}
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '20px',
                  boxShadow:
                    '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            width: '100%',
            paddingY: '1rem',
          }}
        >
          <Stack
            spacing="1rem"
            width={{ md: 'auto', lg: '880px' }}
            sx={{
              color: theme.palette.primary.main,
              margin: '0 auto',
              paddingLeft: { md: '2rem', lg: '0' },
            }}
          >
            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">{event.partner}</Typography>
            </Stack>
          </Stack>
        </Box>
      </>
    )
  }

  return event ? (extraSmallScreen ? <MobileSection /> : <DesktopSection />) : <></>
}

const InfoSection = (props: {
  event: OSEvent
}) => {
  const theme = useTheme()

  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [event, setEvent] = useState<OSEvent>()

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  function MobileSection() {
    return (
      <div>mobile</div>
    )
  }

  function DesktopSection() {

    const renderItem = (title: string,
      icon: ReactNode,
      description: string[]) => {
      return <>
        <Typography variant="headlineMedium">
          {title}
        </Typography>
        <Box mt="2rem">
          <ListItem
            sx={{
              borderColor: theme.palette.background.default,
              backgroundColor: theme.palette.background.default
            }}>
            <ListItemIcon >
              {icon}
            </ListItemIcon>
            <ListItemText>
              <Stack>
                {description.map((d, idx) =>
                  <Box key={idx}>{d}</Box>
                )}
              </Stack>
            </ListItemText>
          </ListItem>
        </Box>
      </>
    }
    return (event &&
      <>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'columns',
            gridTemplateColumns: { xs: 'repeat(1), minmax(15rem, 1fr)', md: `repeat(2, minmax(15rem, 1fr))`, lg: 'repeat(2, minmax(15rem, 1fr))' },
            justifyContent: 'center',
            gap: { xs: '1rem', md: '2rem' },
            width: '100%',
          }}
        >
          <Stack>
            {renderItem(
              "Date and time",
              <EventAvailableOutlinedIcon />,
              [event.date, eventsService.getTimeString(event)]
            )}
            {renderItem(
              "Location",
              <LocationOnIcon />,
              [event.location]
            )}
          </Stack>
          <Stack sx={{ alignItems: "flex-end" }}>
            <Box
              sx={{
                width: { md: '40vw', lg: '25rem' }
              }}>
              <CardReservation event={event} />
            </Box>
          </Stack>
        </Box>
      </>
    )
  }

  return extraSmallScreen ? <MobileSection /> : <DesktopSection />
}

const AboutSection = (props: { event: OSEvent }) => {

  const [event, setEvent] = useState<OSEvent>()

  const description = [
    {
      title: "Building a Better Tomorrow: Leverage a Career in Tech for Social Impact",
      details: [
        "Interested in learning how to use your tech skills for good? Curious about how code can fuel a better future? Want to build your community in the socially conscious tech space?",
        "Join Yolk Labs digital studio and Digital Aid Seattle non-profit development shop to learn how you can leverage your skills to make a difference with technology.",
        "This co-sponsored event will serve as a dynamic platform for connecting tech enthusiasts, startups, freelancers, volunteers, and nonprofits, all aligned in their mission to make a positive impact through technology.",
        "Whether you're a seasoned developer or product manager, bookkeeper or operations lead looking to get involved in the tech space, or a startup founder curious about building in this space – this event is for you.",
        "You'll hear short presentations from each partner (Yolk Labs & Digital Aid Seattle), followed by a guided discussion with breakout groups.",
        "This event is free with RSVP and includes a food spread and beverages. We request everyone join for the full time and take the opportunity to meet new connections."
      ]
    }]

  const agenda =
  {
    title: "Evening Agenda",
    details: [
      "5:30 - 5:45: Initial mingle and drinks",
      "5:45 - 6:45: Welcome and introductions from each partner",
      "   * Yolk Labs will discuss their recent incubation of a socially conscious business(My Beacon) and distinct approaches for startups in this space.",
      "   * Digital Aid Seattle will present an overview of ongoing projects, their company mission, and ways to make a difference through volunteering.",
      "6:45 - 7:05: Q & A and guided discussion",
      "7:05 - 7:30: Networking with food"
    ]
  }
  const closing =
    [{
      title: undefined,
      details: ["We hope you leave the event inspired and ready to create a positive impact in the tech community."]
    }]

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  return (
    <Stack>
      <Typography variant="headlineLarge" component="h2">
        About this event
      </Typography>
      {description.map((desc, idx) =>
        <Stack key={idx}>
          {desc.title &&
            <Typography variant="labelMedium" marginTop={'2rem'}>
              {desc.title}
            </Typography>}
          {desc.details.map((det, jdx) =>
            <Typography key={jdx} marginTop={'2rem'}>
              {det}
            </Typography>)}
        </Stack>)}
      <Stack>
        {agenda.title &&
          <Typography variant="labelMedium" marginTop={'2rem'}>
            {agenda.title}
          </Typography>}
        {agenda.details.map((det, jdx) =>
          <Typography key={jdx} marginTop={'0.5rem'}>
            {det}
          </Typography>)}
      </Stack>
      {closing.map((desc, idx) =>
        <Stack key={idx}>
          {desc.title &&
            <Typography variant="labelMedium" marginTop={'2rem'}>
              {desc.title}
            </Typography>}
          {desc.details.map((det, jdx) =>
            <Typography key={jdx} marginTop={'2rem'}>
              {det}
            </Typography>)}
        </Stack>)}
    </Stack>
  )
}

const ContactUsSection = (props: { title: string }) => {
  return <Section>
    <Subheader variant="headlineMedium">
      {props.title}
    </Subheader>
    <Button variant="contained" href="mailto:info@digitalaidseattle.org">
      Contact us
    </Button>
  </Section>
}

const LogoSection = (props: { event: OSEvent }) => {
  const [event, setEvent] = useState<OSEvent>()

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  return (event &&
    <Section sx={{ alignItems: 'center' }} >
      <img
        src={urlForImage(event.image).url()}
        style={{
          width: "33%",
          display: 'block',
          borderRadius: '20px',
          boxShadow:
            '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
        }}
      />
    </Section>)
}


const EventPage = () => {
  const theme = useTheme()

  const [event, setEvent] = useState<OSEvent>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search)
    eventsService
      .getOne(params.get('name'))
      .then((data) => setEvent(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {event &&
        <>
          <HeaderSection event={event} />
          <SectionContainer backgroundColor={theme.palette.background.default}>
            <Stack
              gap={{ xs: '64px', lg: '80px' }}
              maxWidth="880px"
              margin="0 auto"
            >
              <InfoSection event={event} />
              <AboutSection event={event} />
              <LogoSection event={event} />
            </Stack>
          </SectionContainer>
        </>
      }
      <SectionContainer backgroundColor={theme.palette.background.paper}>
        <ContactUsSection title="Questions about this event?" />
      </SectionContainer>
    </>
  )
}

export default withBasicLayout(EventPage)
