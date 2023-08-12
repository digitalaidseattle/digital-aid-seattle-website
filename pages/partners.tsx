import {
  AccountBalanceOutlined,
  AdminPanelSettingsOutlined,
  ConstructionOutlined,
  DataObjectOutlined,
  DevicesOutlined,
  HandymanOutlined,
  VolunteerActivismOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import CardOne, { ICON_STYLE } from 'components/cards/CardOne'
import { withBasicLayout } from 'components/layouts'
import { designColor } from 'theme/theme'

import PartnerImage from '../assets/partnerWithUs.png'

/* eslint-disable @next/next/no-img-element */

const processContent = [
  'Apply for help using the “Get Help” button.',
  'You will receive an invitation for an interview within a few days.',
  'If accepted, complete your onboarding and gather a team for your project.',
  'Once work has begun, you will get weekly updates on the progress.',
]

const provideContent = [
  {
    title: 'Internal tools',
    description:
      'Every organization needs infrastructure. Support comes in part from good tooling, and we help design and develop effective tools that help teams thrive. As a bonus, we help teams implement good practices and level up on those tools, too.',
    icon: <AdminPanelSettingsOutlined style={ICON_STYLE} />,
  },
  {
    title: 'External tools',
    description:
      'The organizations we support serve individuals in need. Those folks often do not have access to resources and our aim is to streamline and facilitate success, whatever shape that takes.',
    icon: <DevicesOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Technical problems',
    description:
      'No matter the size, any organization in business today is bound to face technical challenges. Open Seattle partners with non-profits and other organizations to navigate these challenges.',
    icon: <HandymanOutlined style={ICON_STYLE} />,
  },
]

const criteriaContent = [
  {
    title: 'Nonprofits',
    description:
      'We strive to bring enterprise-level operational maturity to nonprofits in need.',
    icon: <VolunteerActivismOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Governments',
    description:
      'Local governmental organizations aimed at building a better community deserve a helping hand.',
    icon: <AccountBalanceOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Open Source',
    description:
      'Whenever possible, we will cooperate using open source assets that can be leveraged by anyone.',
    icon: <DataObjectOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Maintainability',
    description:
      "When we build, we don't just build for today. Our services and tools are designed for long-term usability and scale.",
    icon: <ConstructionOutlined style={ICON_STYLE} />,
  },
]

const PartnersPage = () => {
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
              Partner with us
            </Typography>
            <Typography
              variant="headlineLarge"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Open Seattle works with Seattle-based nonprofits to create
              customized digital solutions for their needs, for free.
            </Typography>
            <div style={{ margin: '2rem' }}>
              <Button
                variant="contained"
                color="secondary"
                href={'https://airtable.com/shrVmFy3j3TVWxVBG'}
                target="_blank"
              >
                Partner with us
              </Button>
            </div>
          </Box>
          <Box sx={{ width: '50%' }} maxWidth={'700px'}>
            <img
              src={PartnerImage.src}
              alt="Partner page graphic"
              style={{ objectFit: 'cover' }}
            ></img>
          </Box>
        </Box>
      </Container>
      <Container
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
          textAlign: 'center',
          padding: '2rem',
        }}
        maxWidth={false}
      >
        <Box
          sx={{
            gap: '2rem',
            display: 'grid',
            margin: '2rem',
          }}
        >
          <Typography variant="headlineLarge">Our criteria</Typography>

          <Grid container spacing={2}>
            {criteriaContent.map((item, index) => (
              <Grid item md={3} key={index}>
                <CardOne
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            gap: '2rem',
            display: 'grid',
            margin: '2rem',
            marginTop: '5rem',
          }}
        >
          <Typography variant="headlineLarge">How we can help</Typography>

          <Grid container spacing={2}>
            {provideContent.map((item, index) => (
              <Grid item md={4} key={index}>
                <CardOne
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Container
        sx={{
          backgroundColor: designColor.white,
          color: theme.palette.primary.main,
          padding: '2rem',
        }}
        maxWidth={false}
      >
        <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
          <Typography variant="headlineLarge">The process</Typography>
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
          <div style={{ margin: '2rem' }}>
            <Button
              variant="contained"
              color="primary"
              href={'https://airtable.com/shrVmFy3j3TVWxVBG'}
              target="_blank"
            >
              Partner with us
            </Button>
          </div>
          <Typography variant="headlineLarge">Partner expectations</Typography>
          <Typography variant="bodyLarge">
            Partners should plan to maintain projects after handoff, and to
            provide all volunteers with the necessary documentation for timely
            project completion. All Open Seattle projects are open and
            accessible by default.
          </Typography>
          <Typography variant="headlineLarge">
            Volunteer expectations
          </Typography>
          <Typography variant="bodyLarge">
            All of our volunteers are vetted for experience, and sign a
            volunteer agreement before commencing work with Open Seattle.
          </Typography>
        </Box>
      </Container>
      <Container
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
          textAlign: 'center',
          padding: '5rem',
        }}
        maxWidth={false}
      >
        <Typography variant="headlineLarge">
          Interested in partnering with Open Seattle?
        </Typography>
        <div style={{ margin: '2rem' }}>
          <Button
            variant="contained"
            color="secondary"
            href={'https://airtable.com/shrVmFy3j3TVWxVBG'}
            target="_blank"
          >
            Partner with us
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default withBasicLayout(PartnersPage)
