/* eslint-disable @next/next/no-img-element */
import {
  AccessAlarmOutlined,
  Apartment,
  AutoGraphOutlined,
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
  MilitaryTechOutlined,
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

import MastheadWithImage from 'components/MastheadWithImage'
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
import { useEffect, useState } from 'react'
import { pageCopyService } from 'services/PageCopyService'

const LABELS = {
  HERO_LBL: 'About us',
  HERO_TXT: 'Digital Aid Seattle comprises a group of seasoned professionals with experience in web development, software engineering, digital strategy, visual and content design, and more. We leverage this vast experience to transform the nonprofit sector—to make it more efficient, effective, and accessible to all.',

  WE_DO_LBL: 'What we do',
  WE_DO_TXT: 'Digital Aid Seattle partners with other nonprofits to amplify their impact and to uplift communities through the power of technology.',
  CADRE_LBL: 'View our leadership team',

  VALUES_LBL: 'Our values',
  EXCELLENCE_TXT: 'Striving for professional excellence means taking an uncompromising approach to the service we endeavor to provide. We ensure the utmost quality in what we deliver.',
  EFFICACY_TXT: 'What we do will have impact. We will apply the pareto principle (and other frameworks) to ensure that we are optimizing our efforts at every step in our process from engagement to delivery.',
  EFFICIENCY_TXT: 'We work with a steady and speedy cadence whenever possible. We maintain a MLP (minimum loveable product) mindset without sacrificing the quality of our work.',

  VISION_LBL: 'Our vision',
  VISION_TXT: 'We envision a network of highly functional nonprofits in the Puget Sound area, working in tandem with one another and with the municipal government in order to enable the highest echelon of public service.',

  OUR_TEAM_LBL: 'Our Team',
  OUR_TEAM_TXT: 'The Digital Aid Seattle cadre is made up of highly skilled and committed volunteers, dedicated to serving the greater Seattle area.',
  COMPANIES_TXT: 'We’ve worked in tech and management for companies like:',
  EXPERIENCE_TXT: 'We collectively hold experience in:',
  DEGREES_TXT: 'We have graduate and post-graduate degrees in:'
}

const AboutPage = () => {
  const theme = useTheme()
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    // if (!initialized) {
    //   pageCopyService.getByPage('about')
    //     .then((texts) => {
    //       LABELS.HERO_TXT = texts.find(pc => pc.key === 'hero_TXT')?.copy;
    //       setInitialized(true);
    //     })
    // }
  }, [initialized]);


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
          component="h1"
        >
          {LABELS.HERO_LBL}
        </Typography>
        <Typography
          variant="bodyLarge"
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          {LABELS.HERO_TXT}
        </Typography>
      </>
    </MastheadWithImage>
  )
}

const WhatWeDoSection = ({ theme }) => (
  <AboutUsSection backgroundColor={designColor.white}>
    <Typography variant="headlineMedium" component="h2">
      {LABELS.WE_DO_LBL}
    </Typography>
    <Typography variant="bodyLarge">
      {LABELS.WE_DO_TXT}
    </Typography>
    <Box textAlign="center">
      <Button
        variant="contained"
        href={'/cadre'}
        sx={{ width: 'fit-content' }}
      >
        {LABELS.CADRE_LBL}
      </Button>
    </Box>
  </AboutUsSection>
)

const OurValueSection = ({ theme }) => (
  <AboutUsSection backgroundColor={theme.palette.background.default}>
    <Typography variant="headlineMedium" component="h2">
      {LABELS.VALUES_LBL}
    </Typography>
    <CardRowContainer>
      <CardOne
        title="Excellence"
        description={LABELS.EXCELLENCE_TXT}
        icon={
          <MilitaryTechOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
      <CardOne
        title="Efficacy"
        description={LABELS.EFFICACY_TXT}
        icon={
          <AutoGraphOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
      <CardOne
        title="Efficiency"
        description={LABELS.EFFICIENCY_TXT}
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
    <Typography variant="headlineMedium" component="h2">
      {LABELS.VISION_LBL}
    </Typography>
    <Typography variant="bodyLarge" align="center" display="block">
      {LABELS.VISION_TXT}
    </Typography>
  </AboutUsSection>
)

const OurTeamSection = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const isMediumOrSmallerScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AboutUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.OUR_TEAM_LBL}
      </Typography>
      <Typography variant="bodyLarge" align="center" display="block">
        {LABELS.OUR_TEAM_TXT}
      </Typography>
      <Typography
        variant="titleMedium"
        align="center"
        display="block"
        component="h3"
      >
        {LABELS.COMPANIES_TXT}
      </Typography>
      <Grid container spacing={2} component="ul">
        {companiesList.map((item) => (
          <Grid item xs={6} md={4} key={item.label}>
            <ListItemWithIcon
              listIcon={item.icon}
              listText={!isMediumOrSmallerScreen && item.label}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="titleMedium"
        align="center"
        display="block"
        component="h3"
      >
        {LABELS.EXPERIENCE_TXT}
      </Typography>
      <Grid container spacing={2} component="ul">
        {experienceContent.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item.label}>
            <ListItemWithIcon
              sxProps={!isMediumOrSmallerScreen && { height: '56px' }}
              listIcon={!isMediumOrSmallerScreen && item.icon}
              listText={item.label}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="titleMedium"
        align="center"
        display="block"
        component="h3"
      >
        {LABELS.DEGREES_TXT}
      </Typography>
      <Grid container spacing={2} component="ul">
        {degreeContent.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item.label}>
            <ListItemWithIcon
              sxProps={!isMediumOrSmallerScreen && { height: '56px' }}
              listIcon={!isMediumOrSmallerScreen && item.icon}
              listText={item.label}
            />
          </Grid>
        ))}
      </Grid>
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
    label: 'Informatics & Human Computer Interaction',
    icon: <img src={HCIIcon.src} alt="" width="24px" />,
  },
  {
    label: 'Computer Science / Engineering',
    icon: <TerminalOutlined />,
  },
  { label: 'English Literature', icon: <MenuBook /> },
  { label: 'Music Production', icon: <LibraryMusicOutlined /> },
  { label: 'Architecture', icon: <Apartment /> },
  {
    label: 'Life Sciences',
    icon: <img src={GeneticsIcon.src} alt="" width="24px" />,
  },
  { label: 'Law', icon: <Gavel /> },
  {
    label: 'Astrophysics',
    icon: <img src={PhysicsIcon.src} alt="" width="24px" />,
  },
]
