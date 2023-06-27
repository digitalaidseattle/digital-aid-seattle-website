import { Typography, useTheme } from '@mui/material'
import CardOne from 'components/cards/CardOne'
import { withBasicLayout } from 'components/layouts'
import PageSection from 'components/PageSection'
import { designColor } from 'theme/theme'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'

const AboutPage = () => {
  const theme = useTheme()

  return (
    <div>
      <PageSection
        style={{
          backgroundColor: theme.palette.primary.main,
          color: designColor.white,
        }}
      >
        <div className="flow-row md:flex">
          <div>
            <div>
              <Typography variant="displayMedium">About us</Typography>
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography variant="bodyLarge">
                Open Seattle comprises a group of seasoned professionals with
                experience in web development, software engineering, digital
                strategy, visual and content design, and more. We leverage this
                vast experience to transform the nonprofit sector—to make it
                more efficient, effective, and accessible to all.
              </Typography>
            </div>
          </div>
          <div className="md:shrink-0">
            <img
              className="w-200 md:w-500 lg:w-700 object-contain"
              src="rafiki.png"
              alt=""
            />
          </div>
        </div>
      </PageSection>

      <PageSection
        style={{
          backgroundColor: designColor.white,
          color: designColor.black,
          alignItems: 'center',
        }}
      >
        <div>
          <Typography variant="headlineMedium">What we do</Typography>
        </div>
        <div style={{ marginTop: 20, maxWidth: 500 }}>
          <Typography variant="bodyLarge" align="center" display="block">
            Open Seattle partners with other nonprofits in order to amplifying
            their impact, and to uplift communities with technology.
          </Typography>
        </div>
      </PageSection>

      <PageSection
        style={{
          backgroundColor: theme.palette.background.default,
          color: designColor.black,
          alignItems: 'center',
        }}
      >
        <div>
          <Typography variant="headlineMedium">Our values</Typography>
        </div>
        <div style={{ marginTop: 20, maxWidth: 500 }}>
          <CardOne
            title="Excellence"
            description="Striving for professional excellence means taking an uncompromising approach to the service we endeavor to provide. We ensure the utmost quality in what we deliver."
            icon={<AccessAlarmIcon style={{ color: designColor.white }} />}
          />
          <CardOne
            title="Efficacy"
            description="What we do will have impact. We will apply the pareto principle (and other frameworks) to ensure that we are optimizing our efforts at every step in our process from engagement to delivery."
            icon={<AccessAlarmIcon style={{ color: designColor.white }} />}
          />
          <CardOne
            title="Efficiency"
            description="We work with an eye toward maintaining a steady and speedy cadence whenever possible. We don't sacrifice quality, but we work with an MLP (minimum loveable product) mindset."
            icon={<AccessAlarmIcon style={{ color: designColor.white }} />}
          />
        </div>
      </PageSection>

      <PageSection
        style={{
          backgroundColor: designColor.white,
          color: designColor.black,
          alignItems: 'center',
        }}
      >
        <div>
          <Typography variant="headlineMedium">Our vision</Typography>
        </div>
        <div style={{ marginTop: 20, maxWidth: 500 }}>
          <Typography variant="bodyLarge" align="center" display="block">
            We envision a network of highly functional non-profits in the Puget
            Sound area, working in tandem with one another and with the
            municipal government in order to enable the highest echelon of
            public service.
          </Typography>
        </div>
      </PageSection>

      <PageSection
        style={{
          backgroundColor: theme.palette.background.default,
          color: designColor.black,
          alignItems: 'center',
        }}
      >
        <div>
          <Typography variant="headlineMedium">Our team</Typography>
        </div>
        <div style={{ marginTop: 20, maxWidth: 500 }}>
          <Typography variant="bodyLarge" align="center" display="block">
            The Open Seattle cadre is made up of highly skilled and committed
            volunteers, dedicated to serving the greater Seattle area.
          </Typography>
        </div>
      </PageSection>
    </div>
  )
}

export default withBasicLayout(AboutPage)
