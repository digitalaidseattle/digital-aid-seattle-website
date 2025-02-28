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
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardOne, { ICON_STYLE } from 'components/cards/CardOne'
import CardLeft from 'components/cards/CardLeft'
import SectionContainer from 'components/layout/SectionContainer'
import { LoadingContext, withBasicLayout } from 'components/layouts'
import { designColor } from 'theme/theme'
import PartnerImage from '../assets/partnerWithUs.png'
import MastheadWithImage from 'components/MastheadWithImage'
import { useContext, useEffect, useState } from 'react'
import { pageCopyService } from 'services/PageCopyService'

/* eslint-disable @next/next/no-img-element */
const LABELS = {
  HERO_TITLE: 'Partner with us',
  HERO_TXT: 'Digital Aid Seattle works with Seattle-based nonprofits to create customized digital solutions for their needs, for free.',
  PARTNER_BTN: 'Partner with us',

  CRITERIA_TITLE: 'Our criteria',
  HOW_HELP_TITLE: 'How we can help',
  PROCESS_TITLE: 'The process',

  EXPECTATIONS_TITLE: 'Partner expectations',
  EXPECTATIONS_TXT: 'Partners should plan to maintain projects after handoff, and to provide Digital Aid Seattle volunteers with the necessary documentation for timely project completion. All Digital Aid Seattle projects are open and accessible by default.',
  VOLUNTEER_TITLE: 'Volunteer expectations',
  VOLUNTEER_TXT: 'All of our volunteers are vetted for experience, and sign a volunteer agreement before commencing work with Digital Aid Seattle.',

  INTERESTED_TITLE: 'Interested in partnering with Digital Aid Seattle?',
  PROCESS_STEP_1: 'Apply for help using the “Partner with us” button.',
  PROCESS_STEP_2: 'You will receive an invitation for an interview within a few days.',
  PROCESS_STEP_3: "By detailing your situation, experiences, and aspirations, help us compose a vision of the solution we'll be creating for you.",
  PROCESS_STEP_4: 'Once work has begun, you will get weekly updates on the progress.',

  HELP_INTERNAL_TOOLS_TITLE: 'Internal tools',
  HELP_INTERNAL_TOOLS_TXT: 'Every organization needs infrastructure. Support comes in part from good tooling, and we help design and develop effective tools that help teams thrive. As a bonus, we help teams implement good practices and level up on those tools, too.',
  HELP_EXTERNAL_TOOLS_TITLE: 'External tools',
  HELP_EXTERNAL_TOOLS_TXT: 'The organizations we support serve individuals in need. Those folks often do not have access to resources and our aim is to streamline and facilitate success, whatever shape that takes.',
  HELP_TECH_PROBLEMS_TITLE: 'Technical problems',
  HELP_TECH_PROBLEMS: 'No matter the size, any organization in business today is bound to face technical challenges. Digital Aid Seattle partners with nonprofits and other organizations to navigate these challenges.',

  CRITERIA_NONPROFITS_TITLE: 'Nonprofits',
  CRITERIA_NONPROFITS_TXT: 'We strive to bring enterprise-level operational maturity to nonprofits in need.',
  CRITERIA_GOVERNMENTS_TITLE: 'Governments',
  CRITERIA_GOVERNMENTS_TXT: 'Local governmental organizations aimed at building a better community deserve a helping hand.',
  CRITERIA_OPEN_SOURCE_TITLE: 'Open Source',
  CRITERIA_OPEN_SOURCE_TXT: 'Whenever possible, we will cooperate using open source assets that can be leveraged by anyone.',
  CRITERIA_MAINTAINABILITY_TITLE: 'Maintainability',
  CRITERIA_MAINTAINABILITY_TXT: `When we build, we don't just build for today. Our services and tools are designed for long-term usability and scale.`,
}

const processContent = [
  LABELS.PROCESS_STEP_1,
  LABELS.PROCESS_STEP_2,
  LABELS.PROCESS_STEP_3,
  LABELS.PROCESS_STEP_4
]

const provideContent = [
  {
    title: LABELS.HELP_INTERNAL_TOOLS_TITLE,
    description: LABELS.HELP_INTERNAL_TOOLS_TXT,
    icon: <AdminPanelSettingsOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.HELP_EXTERNAL_TOOLS_TITLE,
    description: LABELS.HELP_EXTERNAL_TOOLS_TXT,
    icon: <DevicesOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.HELP_TECH_PROBLEMS_TITLE,
    description: LABELS.HELP_TECH_PROBLEMS,
    icon: <HandymanOutlined style={ICON_STYLE} />,
  },
]

const criteriaContent = [
  {
    title: LABELS.CRITERIA_NONPROFITS_TITLE,
    description: LABELS.CRITERIA_NONPROFITS_TXT,
    icon: <VolunteerActivismOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.CRITERIA_GOVERNMENTS_TITLE,
    description: LABELS.CRITERIA_GOVERNMENTS_TXT,
    icon: <AccountBalanceOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.CRITERIA_OPEN_SOURCE_TITLE,
    description: LABELS.CRITERIA_OPEN_SOURCE_TXT,
    icon: <DataObjectOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.CRITERIA_MAINTAINABILITY_TITLE,
    description: LABELS.CRITERIA_MAINTAINABILITY_TXT,
    icon: <ConstructionOutlined style={ICON_STYLE} />,
  },
]

const AIRTABLE_FORM = 'https://airtable.com/app6duHw2djMIOYnh/paguUW1sRDdwsPdWN/form';

const PartnersPage = () => {
  const theme = useTheme()
  const palette = theme.palette
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const { setLoading } = useContext(LoadingContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setLoading(true);
      pageCopyService
        .updateCopy(LABELS, 'partners')
        .then(() => setInitialized(true))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }
  }, [initialized])

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <MastheadWithImage
        imageSrc={PartnerImage.src}
        imageText="Partner graphic"
      >
        <>
          <Typography
            variant={isSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            {LABELS.HERO_TITLE}
          </Typography>
          <Typography
            variant="headlineLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            component="span"
          >
            {LABELS.HERO_TXT}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={AIRTABLE_FORM}
            target="_blank"
            sx={{
              alignSelf: 'flex-start',
            }}
          >
            {LABELS.PARTNER_BTN}
          </Button>
        </>
      </MastheadWithImage>
      <SectionContainer backgroundColor={designColor.background}>
        <Stack
          gap={{ xs: '64px', md: '80px' }}
          sx={{
            textAlign: 'center',
          }}
          maxWidth={'880px'}
        >
          <Typography variant="headlineLarge" component="h2">
            {LABELS.CRITERIA_TITLE}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
              gap: '2rem',
            }}
            component="ul"
          >
            {criteriaContent.map((item) => (
              <CardOne
                smallerTitle
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </Box>
          <Typography variant="headlineLarge" component="h2">
            {LABELS.HOW_HELP_TITLE}
          </Typography>
          <CardGridContainer columns={3}>
            {provideContent.map((item) => (
              <CardLeft
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </CardGridContainer>
        </Stack>
      </SectionContainer>
      <SectionContainer backgroundColor={designColor.white}>
        <Stack
          gap={{ xs: '64px', md: '80px' }}
          sx={{
            textAlign: 'left',
          }}
          maxWidth={'880px'}
        >
          <Stack gap={{ xs: 2, md: 4 }}>
            <Typography variant="headlineLarge" component="h2">
              {LABELS.PROCESS_TITLE}
            </Typography>
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
            <div>
              <Button
                variant="contained"
                color="primary"
                href={AIRTABLE_FORM}
                target="_blank"
              >
                {LABELS.PARTNER_BTN}
              </Button>
            </div>
          </Stack>
          <Stack gap={{ xs: 2, md: 4 }}>
            <Typography variant="headlineLarge" component="h2">
              {LABELS.EXPECTATIONS_TITLE}
            </Typography>
            <Typography variant="bodyLarge">
              {LABELS.EXPECTATIONS_TXT}
            </Typography>
          </Stack>
          <Stack gap={{ xs: 2, md: 4 }}>
            <Typography variant="headlineLarge" component="h2">
              {LABELS.VOLUNTEER_TITLE}
            </Typography>
            <Typography variant="bodyLarge">
              {LABELS.VOLUNTEER_TXT}
            </Typography>
          </Stack>
        </Stack>
      </SectionContainer>
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '2rem', md: '2.5rem' }}
          sx={{
            textAlign: 'center',
          }}
          maxWidth={'880px'}
        >
          <Typography variant="headlineLarge" component="h2">
            {LABELS.INTERESTED_TITLE}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            href={AIRTABLE_FORM}
            target="_blank"
            sx={{
              alignSelf: 'center',
            }}
          >
            {LABELS.PARTNER_BTN}
          </Button>
        </Stack>
      </SectionContainer>
    </Container>
  )
}

export default withBasicLayout(PartnersPage)
