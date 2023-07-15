import { AccessAlarmOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import CardOne from 'components/cards/CardOne'
import { designColor } from 'theme/theme'
import Link from 'next/link'
import PartnerImage from '../assets/partnerWithUs.png'
import { withBasicLayout } from 'components/layouts'

/* eslint-disable @next/next/no-img-element */

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
              <Link href="/partner-application" passHref>
                <Button variant="contained" color="secondary">
                  Partner with us
                </Button>
              </Link>
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
          color: designColor.black,
          textAlign: 'center',
          padding: '2rem',
        }}
        maxWidth={false}
      >
        <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
          <Typography variant="headlineLarge">How we can help</Typography>

          <Grid container spacing={2}>
            <Grid item md={4}>
              <CardOne
                title="Internal tools"
                description="Every organization needs infrastructure. Support comes in part from good tooling, and we help design and develop effective tools that help teams thrive. As a bonus, we help teams implement good practices and level up on those tools, too."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
            <Grid item md={4}>
              <CardOne
                title="External tools"
                description="The organizations we support serve individuals in need. Those folks often do not have access to resources and our aim is to streamline and facilitate success, whatever shape that takes."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
            <Grid item md={4}>
              <CardOne
                title="Technical problems"
                description="No matter the size, any organization in business today is bound to face technical challenges. Open Seattle partners with non-profits and other organizations to navigate these challenges."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
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
          <Typography variant="headlineLarge">Our criteria</Typography>

          <Grid container spacing={2}>
            <Grid item md={3}>
              <CardOne
                title="Nonprofits"
                description="We strive to bring enterprise-level operational maturity to nonprofits in need."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
            <Grid item md={3}>
              <CardOne
                title="Governments"
                description="Local governmental organizations aimed at building a better community deserve a helping hand."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
            <Grid item md={3}>
              <CardOne
                title="Open Source"
                description="Whenever possible, we will cooperate using open source assets that can be leveraged by anyone."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
            <Grid item md={3}>
              <CardOne
                title="Maintainability"
                description="When we build, we don't just build for today. Our services and tools are designed for long-term usability and scale."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container
        sx={{
          backgroundColor: designColor.white,
          color: designColor.black,
          padding: '2rem',
        }}
        maxWidth={false}
      >
        <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
          <Typography variant="headlineLarge">The process</Typography>
          <Typography variant="bodyLarge">
            Open Seattle partners with other nonprofits in order to amplifying
            their impact, and to uplift communities with technology.
          </Typography>
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
          color: designColor.black,
          textAlign: 'center',
          padding: '5rem',
        }}
        maxWidth={false}
      >
        <Typography variant="headlineLarge">
          Interested in partnering with Open Seattle?
        </Typography>
        <div style={{ margin: '2rem' }}>
          <Link href="/partner-application" passHref>
            <Button variant="contained" color="secondary">
              Partner with us
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default withBasicLayout(PartnersPage)
