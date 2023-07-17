import { ReactNode } from 'react'

import { Box, Button, Container, List, ListItem, ListItemText, Stack, Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

import PartnerImage from '../assets/partnerWithUs.png'

import NonprofitsIcon from '@mui/icons-material/VolunteerActivismOutlined';
import GovernmentsIcon from '@mui/icons-material/AccountBalanceOutlined';
import OpenSourceIcon from '@mui/icons-material/DataObjectOutlined';
import MaintainabilityIcon from '@mui/icons-material/ConstructionOutlined';

import InternalToolsIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ExternalToolsIcon from '@mui/icons-material/DevicesOutlined';
import TechnicalProblemsIcon from '@mui/icons-material/HandymanOutlined';

import CardLeft from 'components/cards/CardLeft'
import CardOne from 'components/cards/CardOne';
import CardRowContainer from 'components/cards/CardRowContainer';

const InterestedSection = () => {
  const title = 'Interested in partnering with Open Seattle?';
  const buttonText = 'Partner with us';
  const buttonLink = '';
  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingY: '5rem',
      }}
      maxWidth="xl">
      <Typography variant="headlineLarge">
        {title}
      </Typography>
      <Box sx={{ marginTop: { xs: '2rem', md: '2.5rem' } }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            textAlign: 'center'
          }}
          href={buttonLink}>
          {buttonText}
        </Button>
      </Box>
    </Container>);
}

const InfoSection = () => {
  const theme = useTheme()

  const steps = [
    'Apply for help using the “Get Help” button.',
    'You will receive an invitation for an interview within a few days.',
    'If accepted, complete your onboarding and gather a team for your project.',
    'Once work has begun, you will get weekly updates on the progress.'
  ]
  const button = {
    text: 'Partner With Us',
    link: 'TBD'
  }

  return (
    <Container
      sx={{
        backgroundColor: 'white',
        alignItems: 'left',
        display: 'flex',
        flexDirection: 'column',
        paddingY: '5rem',
      }}
      maxWidth="xl">
      <Stack gap={8} sx={{ textAlign: 'left', paddingY: 8 }}>
        {/* Process */}
        <Typography variant="headlineLarge">
          The process
        </Typography>
        <List>
          {steps.map((step, index) => <>
            <li key={index + 1}>
              <Typography
                variant="titleLarge"
                color={theme.palette.primary.main}
              >{`${index + 1}.`}</Typography>
              <Typography variant="bodyLarge" mx={2}>
                {step}
              </Typography>
            </li>
          </>)}
        </List>
        <Box>
          <Button
            variant="contained"
            href={button.link}>
            {button.text}
          </Button>
        </Box>
        {/* Partner */}
        <Typography variant="headlineLarge">
          Partner Expectations
        </Typography>
        <Typography variant="bodyLarge">
          Partners should plan to maintain projects after handoff, and to provide all volunteers with the necessary documentation for timely project completion. All Open Seattle projects are open and accessible by default.
        </Typography>
        {/* Volunteer */}
        <Typography variant="headlineLarge">
          Volunteer Expectations
        </Typography>
        <Typography variant="bodyLarge">
          All of our volunteers are vetted for experience, and sign a volunteer agreement before commencing work with Open Seattle.
        </Typography>
      </Stack>
    </Container>);
}

const HowWeCanHelpSection = () => {
  const theme = useTheme()

  const title = 'How we can help'
  const items = [
    {
      icon: <InternalToolsIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="large" />,
      title: 'Internal tools',
      description: 'Every organization needs infrastructure. Support comes in part from good tooling, and we help design and develop effective tools that help teams thrive. As a bonus, we help teams implement good practices and level up on those tools, too.'
    },
    {
      icon: <ExternalToolsIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="large" />,
      title: 'External tools',
      description: 'The organizations we support serve individuals in need. Those folks often do not have access to resources and our aim is to streamline and facilitate success, whatever shape that takes.'
    },
    {
      icon: <TechnicalProblemsIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="large" />,
      title: 'Technical problems',
      description: 'No matter the size, any organization in business today is bound to face technical challenges. Open Seattle partners with non-profits and other organizations to navigate these challenges.'
    }
  ];

  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingY: '5rem',
      }}
      maxWidth="xl">
      <Typography variant="headlineLarge">
        {title}
      </Typography>
      <CardRowContainer>
        {items.map((item) => <Box
        sx={{
          width: '30rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ><CardLeft
          title={item.title}
          description={item.description}
          icon={item.icon} /></Box>)}
      </CardRowContainer>
    </Container>
  )

}

const CriteriaSection = () => {
  const theme = useTheme()

  const title = "Criteria"
  const criteria = [
    {
      icon: <NonprofitsIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="large" />,
      title: 'Nonprofits', description: 'We strive to bring enterprise-level operational maturity to nonprofits in need.'
    },
    {
      icon: <GovernmentsIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="large" />,
      title: 'Governments', description: 'Local governmental organizations aimed at building a better community deserve a helping hand.'
    },
    {
      icon: <OpenSourceIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="large" />,
      title: 'Open Source', description: 'Whenever possible, we will cooperate using open source assets that can be leveraged by anyone.'
    },
    {
      icon: <MaintainabilityIcon
        sx={{ color: theme.palette.text.secondary }}
        fontSize="large" />,
      title: 'Maintainability', description: 'When we build, we don\'t just build for today. Our services and tools are designed for long-term usability and scale.'
    }
  ];

  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingY: '5rem',
      }}
      maxWidth="xl">
      <Typography variant="headlineLarge">
        {title}
      </Typography>
      <CardRowContainer>
        {criteria.map((item) => <Box
          sx={{
            width: '20rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CardOne
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        </Box>)}
      </CardRowContainer>
    </Container>
  )

}

// Review: Candidate for promotion
type MastheadProps = {
  title: string;
  description: string;
  button?: any;
  image?: string;
}

const Masthead = ({ title, description, button, image }: MastheadProps) => {
  const theme = useTheme()

  return (
    <Container
      sx={{
        backgroundColor: theme.palette.primary.main,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingY: '5rem',
      }}
      maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }} >
        <Box sx={{ width: '50%', textAlign: 'left' }} maxWidth={'422px'}>
          <Typography
            variant="displayLarge"
            sx={{ color: theme.palette.primary.contrastText }}>
            {title}
          </Typography>
          <Typography
            variant="headlineLarge"
            sx={{ color: theme.palette.primary.contrastText }}>
            {description}
          </Typography>
          {button &&
            <Box sx={{ marginTop: { xs: '2rem', md: '2.5rem' } }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  textAlign: 'center'
                }}
                href={button.link}>
                {button.text}
              </Button>
            </Box>
          }
        </Box>
        {image &&
          <Box sx={{ width: '50%' }} maxWidth={'422px'}>
            <img
              src={image}
              alt="Partner page graphic"
              style={{ objectFit: 'cover' }}
            ></img>
          </Box>
        }

      </Box>
    </Container>
  );
}

const PartnersPage = () => {
  return (
    <>
      <Masthead title='Partner With Us'
        description='Open Seattle works with Seattle-based nonprofits to create customized digital solutions for their needs, for free.'
        button={{
          text: 'Partner With Us',
          link: 'TBD'
        }}
        image={PartnerImage.src} />
      <CriteriaSection />
      <HowWeCanHelpSection />
      <InfoSection />
      <InterestedSection />
    </>
  )
}

export default withBasicLayout(PartnersPage)
