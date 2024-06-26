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

import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts';
// icons for role cards
import { NavigateNextSharp } from '@mui/icons-material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardReservation from 'components/cards/CardReservation';
import { Section, Subheader } from 'components/style-utils';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { OSEvent } from 'types';
import { eventsService } from './api/EventsService';
import { useRouter } from 'next/navigation';
import { HeaderWithImage } from 'components/HeaderWithImage';
/*********/

import ProjectImage from '../assets/project-image.png'
const DEFAULT_IMAGE = ProjectImage.src;

const Labels = {
  contact: 'Interested in this event?',
  rsvp: 'RSVP',
  about: 'About this event',
  dateAndTime: 'Date and time',
  location: 'Location',
  homeCrumb: 'Home',
  eventsCrumb: 'Events'
}

const HeaderSection = (props: { event: OSEvent }) => {
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const BreadCrumbSection = (props: { event: OSEvent }) => {
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextSharp fontSize="small" color={'primary'} />}
      >
        <Link href={'./'} >
          <Typography color="textPrimary">{Labels.homeCrumb}</Typography>
        </Link>
        <Link href={'./events'}>
          <Typography color="textPrimary">{Labels.eventsCrumb}</Typography>
        </Link>
        <Typography color="textPrimary">{props.event.title}</Typography>
      </Breadcrumbs>
    )
  }
  function MobileSection() {
    return (
      <>
        <HeaderWithImage imageSrc={props.event.image && props.event.image.asset ? urlForImage(props.event.image).url() : DEFAULT_IMAGE}>
          <Stack>
            <Typography variant="headlineMedium" component="h2">
              Event
            </Typography>
            <Typography variant="displayMedium" component="h1">
              {props.event.title}
            </Typography>
            <Typography variant="headlineMedium" component="h2">
              {props.event.date}
            </Typography>
          </Stack>
        </HeaderWithImage>
        {/* light section */}
        <Box
          sx={{
            padding: '2rem 1rem 0rem 1rem',
          }}
        >
          <BreadCrumbSection event={props.event} />
        </Box>
      </>
    )
  }

  function DesktopSection() {
    return (
      <>
        <HeaderWithImage imageSrc={props.event.image && props.event.image.asset ? urlForImage(props.event.image).url() : DEFAULT_IMAGE}>
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
              {props.event.title}
            </Typography>
            <Typography
              variant={largeScreen ? 'headlineLarge' : 'headlineMedium'}
              component="h2" >
              {props.event.date}
            </Typography>
          </Stack>
        </HeaderWithImage>

        <Box
          sx={{
            width: '100%',
            paddingY: '1rem',
            margin: '0 auto',
            paddingX: { md: '2rem', lg: '0' },
          }}
        >
          <Stack
            spacing="1rem"
            width={{ md: '40vw', lg: '880px' }}
            sx={{
              color: theme.palette.primary.main,
              margin: { md: '0', lg: '0 auto' },
            }}
          >
            <BreadCrumbSection event={props.event} />
          </Stack>
        </Box>
      </>
    )
  }

  return event ? (extraSmallScreen ? <MobileSection /> : <DesktopSection />) : <></>
}

const InfoSection = (props: { event: OSEvent }) => {
  const theme = useTheme()

  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const renderItem = (title: string,
    icon: ReactNode,
    description: string[]) => {
    return <>
      <Typography variant="headlineMedium">
        {title}
      </Typography>
      <Box mt="1rem">
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
    return (<Stack>
      {props.event.rsvpLink &&
        <CardReservation event={props.event} />
      }
      <Box marginTop={"1rem"}>
        {renderItem(
          Labels.dateAndTime,
          <EventAvailableOutlinedIcon />,
          [props.event.date, eventsService.getTimeString(props.event)]
        )}
      </Box>
      <Box>
        {renderItem(
          Labels.location,
          <LocationOnIcon />,
          [props.event.location]
        )}
      </Box>
    </Stack>)
  }

  function DesktopSection() {

    return (
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
              Labels.dateAndTime,
              <EventAvailableOutlinedIcon />,
              [props.event.date, eventsService.getTimeString(props.event)]
            )}
          </Box>
          <Box >
            {renderItem(
              Labels.location,
              <LocationOnIcon />,
              [props.event.location]
            )}
          </Box>
        </Stack>
        {props.event.rsvpLink &&
          <Stack sx={{ alignItems: "flex-end" }}>
            <Box sx={{ width: { md: '40vw', lg: '25rem' } }}>
              <CardReservation event={props.event} />
            </Box>
          </Stack>
        }
      </Box>
    )
  }

  return extraSmallScreen ? <MobileSection /> : <DesktopSection />
}

const AboutSection = (props: { event: OSEvent }) => {

  return (props.event && props.event.about &&
    <Stack>
      <Typography variant="headlineLarge" component="h1">
        {Labels.about}
      </Typography>
      <Markdown className='markdown'>{props.event.about}</Markdown>
    </Stack>
  )
}

const ContactUsSection = (props: { event: OSEvent }) => {
  const theme = useTheme()

  return (props.event.rsvpLink &&
    <SectionContainer backgroundColor={theme.palette.background.paper}>
      <Section>
        <Subheader variant="headlineMedium">
          {Labels.contact}
        </Subheader>
        <Link href={props.event.rsvpLink} target="_blank"
          passHref>
          <Button variant="contained">{Labels.rsvp}</Button>
        </Link>
      </Section>
    </SectionContainer>)
}

const ActivitySection = (props: { event: OSEvent }) => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const width = extraSmallScreen ? "100%" : "50%"

  return (props.event.activity && props.event.activity.asset &&
    <Section  >
      <img
        src={urlForImage(props.event.activity).url()}
        style={{
          width: width,
          // TODO A drop shadow would be nice, but centering needs work
          // borderRadius: '20px',
          // boxShadow:
          //   '0px 0px 0px 0px rgba(52, 61, 62, 0.08), 1px 1px 1px 1px rgba(52, 61, 62, 0.08)',
        }}
      />
    </Section>)
}

const EventPage = () => {
  const theme = useTheme()
  const router = useRouter();

  const [event, setEvent] = useState<OSEvent>()
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search)
    const eventName = params.get('name')
    eventsService
      .getOne(eventName)
      .then((data) => {
        if (data === null) {
          console.error(`Event '${eventName} not found.`);
          router.push('/404')
        } else {
          setEvent(data)
        }
      })
      .catch((error) => {
        console.error(error);
        router.push('/404')
      })
      .finally(() => setLoading(false))
  }, [setLoading, router])

  return (
    <BlockComponent block={!event}>
      {event &&
        <>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default
            }}>
            <HeaderSection event={event} />
          </Box>
          <SectionContainer backgroundColor={theme.palette.background.default}>
            <Stack
              gap={{ xs: '1rem', lg: '2rem' }}
              maxWidth="880px"
              margin="0 auto" >
              <InfoSection event={event} />
              <AboutSection event={event} />
              <ActivitySection event={event} />
            </Stack>
          </SectionContainer>
          {event.rsvpLink && <ContactUsSection event={event} />}
        </>
      }
    </BlockComponent>
  )
}

export default withBasicLayout(EventPage)
