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
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import CardOne from 'components/cards/CardOne'
import { withBasicLayout } from 'components/layouts'
import { designColor } from 'theme/theme'

// TODO - use theme instead of designColor
const SectionContainer = styled(Container)(({ theme }) => ({
  backgroundColor: designColor.white,
  color: designColor.black,
  textAlign: 'center',
  padding: '2rem',
}))

const AboutPage = () => {
  const theme = useTheme()
  const palette = theme.palette

  return (
    <div>
      <Container
        sx={{
          backgroundColor: palette.primary.light,
          padding: { md: '2rem' },
        }}
        maxWidth={false}
      >
        <Grid container spacing={20}>
          <Grid item xs={6}>
            <Container sx={{ margin: '10rem' }}>
              <div>
                <Typography
                  variant="displayLarge"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    marginBottom: '2rem',
                  }}
                >
                  About us
                </Typography>
              </div>
              <div>
                <Typography
                  variant="bodyLarge"
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Open Seattle comprises a group of seasoned professionals with
                  experience in web development, software engineering, digital
                  strategy, visual and content design, and more. We leverage
                  this vast experience to transform the nonprofit sector—to make
                  it more efficient, effective, and accessible to all.
                </Typography>
              </div>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <img
              className="w-200 md:w-500 lg:w-700 object-contain"
              src="rafiki.png"
              alt=""
            />
          </Grid>
        </Grid>
      </Container>

      <SectionContainer
        sx={{
          backgroundColor: designColor.white,
        }}
        maxWidth={false}
      >
        <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
          <Typography variant="headlineMedium">What we do</Typography>
          <Typography variant="bodyLarge">
            Open Seattle partners with other nonprofits in order to amplifying
            their impact, and to uplift communities with technology.
          </Typography>
        </Box>
      </SectionContainer>

      <SectionContainer
        style={{
          backgroundColor: theme.palette.background.default,
        }}
        maxWidth={false}
      >
        <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
          <Typography variant="headlineMedium">Our values</Typography>

          <Grid container spacing={2}>
            <Grid item md={4}>
              <CardOne
                title="Excellence"
                description="Striving for professional excellence means taking an uncompromising approach to the service we endeavor to provide. We ensure the utmost quality in what we deliver."
                icon={
                  <MilitaryTechOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
            <Grid item md={4}>
              <CardOne
                title="Efficacy"
                description="What we do will have impact. We will apply the pareto principle (and other frameworks) to ensure that we are optimizing our efforts at every step in our process from engagement to delivery."
                icon={
                  <AutoGraphOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
            <Grid item md={4}>
              <CardOne
                title="Efficiency"
                description="We work with an eye toward maintaining a steady and speedy cadence whenever possible. We don't sacrifice quality, but we work with an MLP (minimum loveable product) mindset."
                icon={
                  <AccessAlarmOutlined style={{ color: designColor.white }} />
                }
              />
            </Grid>
          </Grid>
        </Box>
      </SectionContainer>

      <SectionContainer
        style={{
          backgroundColor: designColor.white,
        }}
        maxWidth={false}
      >
        <Box sx={{ gap: '2rem', display: 'grid', margin: '2rem' }}>
          <Typography variant="headlineMedium">Our vision</Typography>
          <Typography variant="bodyLarge" align="center" display="block">
            We envision a network of highly functional non-profits in the Puget
            Sound area, working in tandem with one another and with the
            municipal government in order to enable the highest echelon of
            public service.
          </Typography>
        </Box>
      </SectionContainer>

      <SectionContainer
        style={{
          backgroundColor: theme.palette.background.default,
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
    </div>
  )
}

export default withBasicLayout(AboutPage)
