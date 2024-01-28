/*
 * @2024 Digital Aid Seattle
 */
import { ReactNode, useContext, useEffect, useState } from 'react';

import { urlForImage } from '../sanity/lib/image';

import {
  Box,
  Breadcrumbs,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SectionContainer from 'components/layout/SectionContainer';

import { LoadingContext, withBasicLayout } from 'components/layouts';
// icons for role cards
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardReservation from 'components/cards/CardReservation';
import { Section, Subheader } from 'components/style-utils';
import { OSEvent } from 'types';
import { eventsService } from './api/EventsService';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { NavigateNextSharp } from '@mui/icons-material';
/*********/

const HeaderSection = (props: { event: OSEvent }) => {
  const theme = useTheme()
  const [event, setEvent] = useState<OSEvent>()
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  const BreadCrumbSection = (props: { event: OSEvent }) => {
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextSharp fontSize="small" color={'primary'} />}
      >
        <Link href={'./'} >
          <Typography color="textPrimary">Home</Typography>
        </Link>
        <Link href={'./events'}>
          <Typography color="textPrimary">Events</Typography>
        </Link>
        <Typography color="textPrimary">{props.event.title}</Typography>
      </Breadcrumbs>
    )
  }

  function MobileSection() {
    return (
      <Box sx={{
        backgroundColor: theme.palette.background.default
      }}>
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

          <img
            src={urlForImage(event.image).url()}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              display: 'block'
            }}
          />
          <Stack spacing="1rem">
            <BreadCrumbSection event={event} />
          </Stack>
        </Stack>
      </Box>
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
                  display: 'block'
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
            <BreadCrumbSection event={event} />
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

  function MobileSection() {
    return (event &&
      <Stack>
        <CardReservation event={event} />
        <Box marginTop={"2rem"}>
          {renderItem(
            "Date and time",
            <EventAvailableOutlinedIcon />,
            [event.date, eventsService.getTimeString(event)]
          )}
        </Box>
        <Box>
          {renderItem(
            "Location",
            <LocationOnIcon />,
            [event.location]
          )}
        </Box>
      </Stack>
    )
  }

  function DesktopSection() {

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
            <Box>
              {renderItem(
                "Date and time",
                <EventAvailableOutlinedIcon />,
                [event.date, eventsService.getTimeString(event)]
              )}
            </Box>
            <Box marginTop={"4rem"}>
              {renderItem(
                "Location",
                <LocationOnIcon />,
                [event.location]
              )}
            </Box>
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

  return event ? extraSmallScreen ? <MobileSection /> : <DesktopSection /> : <></>
}

const AboutSection = (props: { event: OSEvent }) => {

  const [event, setEvent] = useState<OSEvent>()

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  return (event &&
    <Stack>
      <Typography variant="headlineLarge" component="h1">
        About this event
      </Typography>
      <Stack>
        {event && event.about
          && event.about.map((a, idx) =>
            <Stack key={idx}>
              {a.title &&
                <Typography variant="labelLarge" marginTop={'2rem'}>
                  {a.title}
                </Typography>
              }
              {a.details && a.details.map((det, ddx) =>
                <Box className="markdown" key={ddx} marginTop={'2rem'}>
                  <Markdown>{det}</Markdown>
                </Box>
              )}
            </Stack>
          )}
      </Stack>
    </Stack>
  )
}

const ContactUsSection = (props: { event: OSEvent }) => {
  const theme = useTheme()

  const [event, setEvent] = useState<OSEvent>()

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  return (event && event.rsvpLink &&
    <SectionContainer backgroundColor={theme.palette.background.paper}>
      <Section>
        <Subheader variant="headlineMedium">
          Interested in this event?
        </Subheader>
        <Link href={event.rsvpLink} target="_blank"
          passHref>
          <Button variant="contained">RSVP</Button>
        </Link>
      </Section>
    </SectionContainer>)
}



const ActivitySection = (props: { event: OSEvent }) => {
  const [event, setEvent] = useState<OSEvent>()

  useEffect(() => {
    setEvent(props.event)
  }, [props])

  return (event && event.activity &&
    <Section  >
      <img
        src={urlForImage(event.activity).url()}
        style={{
          width: "50%",
          // borderRadius: '20px',
          // boxShadow:
          //   '0px 0px 0px 0px rgba(52, 61, 62, 0.08), 1px 1px 1px 1px rgba(52, 61, 62, 0.08)',
        }}
      />
    </Section>)
}


const EventPage = () => {
  const theme = useTheme()

  const [event, setEvent] = useState<OSEvent>()
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search)
    eventsService
      .getOne(params.get('name'))
      .then((data) => setEvent(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
    <>
      <HeaderSection event={event} />
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '64px', lg: '80px' }}
          maxWidth="880px"
          margin="0 auto" >
          <InfoSection event={event} />
          <AboutSection event={event} />
          <ActivitySection event={event} />
        </Stack>
      </SectionContainer>
      <ContactUsSection event={event} />
    </>
  )
}

export default withBasicLayout(EventPage)
