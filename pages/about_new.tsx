/* eslint-disable @next/next/no-img-element */
import {
  AccessAlarmOutlined,
  AutoGraphOutlined,
  MilitaryTechOutlined,
} from '@mui/icons-material'
import {
  Box,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import { withBasicLayout } from 'components/layouts'
import { designColor } from 'theme/theme'

import AboutUsImage from '../assets/aboutUs.png'

const SectionContainer = styled(Container)(() => ({
  backgroundColor: designColor.white,
  color: designColor.black,
  textAlign: 'center',
  padding: '2rem 12rem 2rem 12rem',
}))


const AboutPage = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <div>
      <AboutUsHeroSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <WhatWeDoSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <OurValueSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <OurVisionSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <OurTeamSection theme={theme} extraSmallScreen={extraSmallScreen} />
    </div>
  )
}

export default withBasicLayout(AboutPage)

const AboutUsHeroSection = ({ theme, extraSmallScreen }) => (
  <Stack
    sx={{
      backgroundColor: theme.palette.primary.main,
      padding: extraSmallScreen ? '1rem': '2rem',
    }}
  >
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item md={4} xs={12}>
        <Box sx={{ gap: '2.5rem', display: 'grid', margin: '2rem' }}>
          <Typography
            variant={extraSmallScreen ? "displayMedium" : "displayLarge"}
            sx={{ color: theme.palette.primary.contrastText }}
          >
            About us
          </Typography>
          <Typography
            variant="bodyLarge"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Open Seattle comprises a group of seasoned professionals with
            experience in web development, software engineering, digital
            strategy, visual and content design, and more. We leverage this vast
            experience to transform the nonprofit sector—to make it more
            efficient, effective, and accessible to all.
          </Typography>
        </Box>
      </Grid>
      <Grid item md={4} xs={12}>
        <img src={AboutUsImage.src} alt="About Us page graphic"></img>
      </Grid>
    </Grid>
  </Stack>
)

const WhatWeDoSection = ({ theme, extraSmallScreen }) => (
  <SectionContainer
    sx={{
      backgroundColor: designColor.white,
      padding: extraSmallScreen ? '1rem' : '2rem 12rem 2rem 12rem',
    }}
    maxWidth={false}
  >
    <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
      <Typography variant="headlineMedium">What we do</Typography>
      <Typography variant="bodyLarge">
        Open Seattle partners with other nonprofits in order to amplifying their
        impact, and to uplift communities with technology.
      </Typography>
    </Box>
  </SectionContainer>
)

const OurValueSection = ({ theme, extraSmallScreen }) => (
  <SectionContainer
    style={{
      backgroundColor: theme.palette.background.default,
      padding: extraSmallScreen ? '1rem' : '2rem 12rem 2rem 12rem',
    }}
    maxWidth={false}
  >
    <Typography variant="headlineMedium">Our values</Typography>
    <CardRowContainer>
      <CardOne
        title="Excellence"
        description="Striving for professional excellence means taking an uncompromising approach to the service we endeavor to provide. We ensure the utmost quality in what we deliver."
        icon={<MilitaryTechOutlined style={{ color: designColor.white }} />}
      />
      <CardOne
        title="Efficacy"
        description="What we do will have impact. We will apply the pareto principle (and other frameworks) to ensure that we are optimizing our efforts at every step in our process from engagement to delivery."
        icon={<AutoGraphOutlined style={{ color: designColor.white }} />}
      />
      <CardOne
        title="Efficiency"
        description="We work with an eye toward maintaining a steady and speedy cadence whenever possible. We don't sacrifice quality, but we work with an MLP (minimum loveable product) mindset."
        icon={<AccessAlarmOutlined style={{ color: designColor.white }} />}
      />
    </CardRowContainer>
  </SectionContainer>
)

const OurVisionSection = ({ theme, extraSmallScreen }) => (
  <SectionContainer
    style={{
      backgroundColor: designColor.white,
      padding: extraSmallScreen ? '1rem' : '2rem 12rem 2rem 12rem',
    }}
    maxWidth={false}
  >
    <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
      <Typography variant="headlineMedium">Our vision</Typography>
      <Typography variant="bodyLarge" align="center" display="block">
        We envision a network of highly functional non-profits in the Puget
        Sound area, working in tandem with one another and with the municipal
        government in order to enable the highest echelon of public service.
      </Typography>
    </Box>
  </SectionContainer>
)

const OurTeamSection = ({ theme, extraSmallScreen }) => (
  <SectionContainer
    style={{
      backgroundColor: theme.palette.background.default,
      padding: extraSmallScreen ? '1rem' : '2rem 12rem 2rem 12rem',
    }}
    maxWidth={false}
  >
    <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
      <Typography variant="headlineMedium">Our team</Typography>
      <Typography variant="bodyLarge" align="center" display="block">
        The Open Seattle cadre is made up of highly skilled and committed
        volunteers, dedicated to serving the greater Seattle area.
      </Typography>
    </Box>
  </SectionContainer>
)
