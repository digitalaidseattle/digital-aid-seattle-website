/* eslint-disable @next/next/no-img-element */
import {
  AccessAlarmOutlined,
  AutoGraphOutlined,
  MilitaryTechOutlined,
} from '@mui/icons-material'
import {
  Apartment,
  Code,
  DataObjectOutlined,
  Diversity1Outlined,
  Diversity3,
  DrawOutlined,
  EmojiObjectsOutlined,
  Gavel,
  LibraryMusicOutlined,
  ManageAccountsOutlined,
  MenuBook,
  ScreenSearchDesktopOutlined,
  Storefront,
  SupervisorAccountOutlined,
  TerminalOutlined,
  VolunteerActivismOutlined,
} from '@mui/icons-material'
import {
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
import { designColor } from 'theme/theme'

import AboutUsImage from '../assets/aboutUs.png'
import AppleLogo from '../assets/aboutUsIcons/apple.svg'
import GeneticsIcon from '../assets/aboutUsIcons/genetics.svg'
import GoogleLogo from '../assets/aboutUsIcons/google.svg'
import HCIIcon from '../assets/aboutUsIcons/hci.svg'
import MicrosoftLogo from '../assets/aboutUsIcons/microsoft.svg'
import NOAALogo from '../assets/aboutUsIcons/noaa.svg'
import NonProfitManagementIcon from '../assets/aboutUsIcons/non_profit_management.svg'
import PhysicsIcon from '../assets/aboutUsIcons/physics.svg'
import StarbucksLogo from '../assets/aboutUsIcons/starbucks.svg'
import VerizonLogo from '../assets/aboutUsIcons/verizon.svg'
import MastheadWithImage from 'components/MastheadWithImage'

const AboutPage = () => {
  const theme = useTheme()

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <AboutUsHeroSection />
      <WhatWeDoSection theme={theme} />
      <OurValueSection theme={theme} />
      <OurVisionSection theme={theme} />
      <OurTeamSection />
    </Container>
  )
}

export default withBasicLayout(AboutPage)

const AboutUsSection = ({ backgroundColor, children }) => (
  <SectionContainer backgroundColor={backgroundColor}>
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        textAlign: 'center',
      }}
      maxWidth={'880px'}
    >
      {children}
    </Stack>
  </SectionContainer>
)

const AboutUsHeroSection = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <MastheadWithImage
      imageSrc={AboutUsImage.src}
      imageText="About Us page graphic"
    >
      <>
        <Typography
          variant={extraSmallScreen ? 'displayMedium' : 'displayLarge'}
          sx={{ color: theme.palette.primary.contrastText }}
        >
          About us
        </Typography>
        <Typography
          variant="bodyLarge"
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          Digital Aid Seattle comprises a group of seasoned professionals with
          experience in web development, software engineering, digital strategy,
          visual and content design, and more. We leverage this vast experience
          to transform the nonprofit sector—to make it more efficient,
          effective, and accessible to all.
        </Typography>
      </>
    </MastheadWithImage>
  )
}

const WhatWeDoSection = ({ theme }) => (
  <AboutUsSection backgroundColor={designColor.white}>
    <Typography variant="headlineMedium">What we do</Typography>
    <Typography variant="bodyLarge">
      Digital Aid Seattle partners with other nonprofits in order to amplifying their
      impact, and to uplift communities with technology.
    </Typography>
  </AboutUsSection>
)

const OurValueSection = ({ theme }) => (
  <AboutUsSection backgroundColor={theme.palette.background.default}>
    <Typography variant="headlineMedium">Our values</Typography>
    <CardRowContainer>
      <CardOne
        title="Excellence"
        description="Striving for professional excellence means taking an uncompromising approach to the service we endeavor to provide. We ensure the utmost quality in what we deliver."
        icon={
          <MilitaryTechOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
      <CardOne
        title="Efficacy"
        description="What we do will have impact. We will apply the pareto principle (and other frameworks) to ensure that we are optimizing our efforts at every step in our process from engagement to delivery."
        icon={
          <AutoGraphOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
      <CardOne
        title="Efficiency"
        description="We work with a steady and speedy cadence whenever possible. We maintain a MLP (minimum loveable product) mindset without sacrificing the quality of our work."
        icon={
          <AccessAlarmOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
    </CardRowContainer>
  </AboutUsSection>
)

const OurVisionSection = ({ theme }) => (
  <AboutUsSection backgroundColor={designColor.white}>
    <Typography variant="headlineMedium">Our vision</Typography>
    <Typography variant="bodyLarge" align="center" display="block">
      We envision a network of highly functional non-profits in the Puget Sound
      area, working in tandem with one another and with the municipal government
      in order to enable the highest echelon of public service.
    </Typography>
  </AboutUsSection>
)

const OurTeamSection = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const isMediumOrSmallerScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AboutUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium">Our team</Typography>
      <Typography variant="bodyLarge" align="center" display="block">
        The Digital Aid Seattle cadre is made up of highly skilled and committed
        volunteers, dedicated to serving the greater Seattle area.
      </Typography>
      <Typography variant="titleMedium" align="center" display="block">
        We’ve worked in tech and management for companies like:
      </Typography>
      <Grid container spacing={2}>
        {companiesList.map((item) => (
          <Grid item xs={6} md={4} key={item.label}>
            <ListItemWithIcon
              listIcon={item.icon}
              listText={!extraSmallScreen && item.label}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="titleMedium" align="center" display="block">
        We collectively hold experience in:
      </Typography>
      <Grid container spacing={2}>
        {experienceContent.map((item) => (
          <Grid item xs={6} md={6} lg={4} key={item.label}>
            <ListItemWithIcon
              sxProps={!isMediumOrSmallerScreen && { height: '56px' }}
              listIcon={!extraSmallScreen && item.icon}
              listText={item.label}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="titleMedium" align="center" display="block">
        And we have degrees in:
      </Typography>
      <Grid container spacing={2}>
        {degreeContent.map((item) => (
          <Grid item xs={6} md={6} lg={4} key={item.label}>
            <ListItemWithIcon
              sxProps={!isMediumOrSmallerScreen && { height: '56px' }}
              listIcon={!extraSmallScreen && item.icon}
              listText={item.label}
            />
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center">
        <Button
          variant="contained"
          href={'/project_individual'}
          sx={{ width: 'fit-content' }}
        >
          View our Cadre
        </Button>
      </Box>
    </AboutUsSection>
  )
}

const companiesList = [
  {
    label: 'Apple',
    icon: <img src={AppleLogo.src} alt="Apple logo" width="40px" />,
  },
  {
    label: 'Google',
    icon: <img src={GoogleLogo.src} alt="Google logo" width="40px" />,
  },
  {
    label: 'Verizon',
    icon: <img src={VerizonLogo.src} alt="Verizon logo" width="40px" />,
  },
  {
    label: 'Microsoft',
    icon: <img src={MicrosoftLogo.src} alt="Microsoft logo" width="40px" />,
  },
  {
    label: 'Starbucks',
    icon: <img src={StarbucksLogo.src} alt="Starbucks logo" width="40px" />,
  },
  {
    label: 'NOAA',
    icon: <img src={NOAALogo.src} alt="NOAA logo" width="40px" />,
  },
]

const experienceContent = [
  {
    label: 'Executive, Admissions, & Marketing Directing',
    icon: <SupervisorAccountOutlined />,
  },
  {
    label: 'Business Management & Marketing',
    icon: <Storefront />,
  },
  { label: 'Technology Entrepreneurship', icon: <EmojiObjectsOutlined /> },
  {
    label: 'Nonprofit Management',
    icon: (
      <img src={NonProfitManagementIcon.src} alt="NOAA logo" width="24px" />
    ),
  },
  { label: 'Operations Management', icon: <ManageAccountsOutlined /> },
  { label: 'Technology Leadership', icon: <Diversity3 /> },
  { label: 'Volunteer Management', icon: <Diversity1Outlined /> },

  { label: 'Back-end Development', icon: <DataObjectOutlined /> },
  { label: 'UX Research & Design', icon: <ScreenSearchDesktopOutlined /> },
  { label: 'Graphic Design & Illustration', icon: <DrawOutlined /> },
  { label: 'Nonprofit Contribution', icon: <VolunteerActivismOutlined /> },

  { label: 'Front-end Development', icon: <Code /> },
]

const degreeContent = [
  {
    label: 'BS in Informatics & Human Computer Interaction',
    icon: <img src={HCIIcon.src} alt="NOAA logo" width="24px" />,
  },
  {
    label: 'BS, MS in Computer Science / Engineering',
    icon: <TerminalOutlined />,
  },
  { label: 'BA in English Literature', icon: <MenuBook /> },
  { label: 'BPS in Music Production', icon: <LibraryMusicOutlined /> },
  { label: 'BA, MA in Architecture', icon: <Apartment /> },
  {
    label: 'BA, MS in Life Sciences',
    icon: <img src={GeneticsIcon.src} alt="NOAA logo" width="24px" />,
  },
  { label: 'BA, MBA, JD in Law', icon: <Gavel /> },
  {
    label: 'BA in Astrophysics',
    icon: <img src={PhysicsIcon.src} alt="NOAA logo" width="24px" />,
  },
]
