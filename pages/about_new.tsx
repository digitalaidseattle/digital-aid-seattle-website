/* eslint-disable @next/next/no-img-element */
import {
  AccessAlarmOutlined,
  AutoGraphOutlined,
  MilitaryTechOutlined,
} from '@mui/icons-material'
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
import { designColor } from 'theme/theme'

import AboutUsImage from '../assets/aboutUs.png'

const AboutPage = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <AboutUsHeroSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <WhatWeDoSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <OurValueSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <OurVisionSection theme={theme} extraSmallScreen={extraSmallScreen} />
      <OurTeamSection theme={theme} extraSmallScreen={extraSmallScreen} />
    </Container>
  )
}

export default withBasicLayout(AboutPage)

const AboutUsHeroSection = ({ theme, extraSmallScreen }) => (
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
          Open Seattle comprises a group of seasoned professionals with
          experience in web development, software engineering, digital strategy,
          visual and content design, and more. We leverage this vast experience
          to transform the nonprofit sector—to make it more efficient,
          effective, and accessible to all.
        </Typography>
      </Box>
      <img
        src={AboutUsImage.src}
        alt="VAbout Us page graphic"
        width="418px"
        style={{ objectFit: 'cover' }}
      />
    </Box>
  </SectionContainer>
)

const WhatWeDoSection = ({ theme, extraSmallScreen }) => (
  <SectionContainer
    backgroundColor={designColor.white}
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
  backgroundColor={theme.palette.background.default}
  >
    <Stack
        gap={{ xs: '64px', md: '80px' }}
        sx={{
          textAlign: 'center',
        }}
        maxWidth={'880px'}
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
        description="What we do have impact. We apply the pareto principle (and other frameworks) to ensure that we  optimize our efforts from engagement to delivery."
        icon={<AutoGraphOutlined style={{ color: designColor.white }} />}
      />
      <CardOne
        title="Efficiency"
        description="We work with a steady and speedy cadence whenever possible. We maintain a MLP (minimum loveable product) mindset without sacrificing the quality of our work."
        icon={<AccessAlarmOutlined style={{ color: designColor.white }} />}
      />
    </CardRowContainer>
    </Stack>
  </SectionContainer>
)

const OurVisionSection = ({ theme, extraSmallScreen }) => (
  <SectionContainer
  backgroundColor={designColor.white}
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
  backgroundColor={theme.palette.background.default}
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
