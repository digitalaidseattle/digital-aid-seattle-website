import {
  AccountBalanceOutlined,
  AdminPanelSettingsOutlined,
  ConstructionOutlined,
  DataObjectOutlined,
  DevicesOutlined,
  HandymanOutlined,
  VolunteerActivismOutlined,
  ContentCutOutlined,
  Diversity3Outlined,
  HandshakeOutlined
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
import SectionContainer from 'components/layout/SectionContainer'
import { LoadingContext, withBasicLayout } from 'components/layouts'
import PartnerImage from '../assets/partnerWithUs.png'
import MastheadWithImage from 'components/MastheadWithImage'
import { useContext, useEffect, useState } from 'react'
import { pageCopyService } from 'services/PageCopyService'
import CardHorizontal from 'components/cards/CardHorizontal'

/* eslint-disable @next/next/no-img-element */
const LABELS = {
  HERO_TITLE: 'Digital Aid Seattle: Partnering for Impact',
  HERO_TXT: 'Digital Aid Seattle works with Seattle-based nonprofits to create customized digital solutions for their needs, for free.',
  PARTNER_BTN: 'Partner with us',

  WHAT_IS_A_PARTNER_TITLE: 'What is a Partner?',
  WHAT_IS_A_PARTNER_TEXT: 'At Digital Aid Seattle, we believe in the power of collaboration to create positive change. We partner with Seattle area nonprofits to provide them with the essential technology solutions they need to thrive. Our partners are a diverse group of organizations, all working towards important social causes like children welfare, homelessness, elder care and many more.',

  CRITERIA_TITLE: 'Our criteria',
  HOW_HELP_TITLE: 'How we can help',

  WHAT_WE_DO_LABEL: 'What we do',
  WHAT_WE_DO_TXT: 'Digital Aid Seattle partners with nonprofits like Plymouth Housing and Seattle Humane to leverage technology, improving operations and extending their community reach through solutions like inventory and client request management.',
  LEADERSHIP_BTN: 'View our leadership team',

  PROCESS_TITLE: 'Process to Become a Partner',
  PROCESS_TEXT: `We understand that every nonprofit has unique needs and goals. That's why we take a personalized approach to partnering. Here's a simple process to get started:`,
  INTERESTED_TITLE: 'Interested in partnering with Digital Aid Seattle?',
  PROCESS_STEP_TITLE_1: 'Contact Us',
  PROCESS_STEP_TITLE_2: 'Consultation',
  PROCESS_STEP_TITLE_3: 'Needs Assessment',
  PROCESS_STEP_TITLE_4: 'Solution Development',
  PROCESS_STEP_TITLE_5: 'Implementation and Support',
  PROCESS_STEP_1: 'Reach out to us through using the “Partner with us” button below ',
  PROCESS_STEP_2: 'You will receive an invitation to a consultation call with us ',
  PROCESS_STEP_3: "During the consultation, we will discuss your organization's mission, goals, and current technology challenges.",
  PROCESS_STEP_4: 'We will work with you to develop a customized technology plan that aligns with your specific needs and budget.',
  PROCESS_STEP_5: 'Our team will implement the agreed-upon solutions to ensure your success.',

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

  BENEFITS_TITLE: 'Benefits of Partnering with Digital Aid Seattle',
  BENEFITS_SUBTITLE: 'By partnering with Digital Aid Seattle, you can:',
  BENEFIT_CARD_TITLE_1: 'Reduce Costs',
  BENEFIT_CARD_TITLE_2: 'Increase Efficiency',
  BENEFIT_CARD_TITLE_3: 'Reach a Wider Audience',
  BENEFIT_CARD_TEXT_1: 'Our services are completely free, allowing you to stretch your resources further and focus on your core mission.',
  BENEFIT_CARD_TEXT_2: 'Technology solutions can help you streamline your operations and free up staff time for more impactful work.',
  BENEFIT_CARD_TEXT_3: 'Better technology amplifies your reach and helps you to connect with your target audience and supporters with more ease',
  BENEFITS_TAGLINE: 'Become a Partner Today!',
  BENEFITS_TAGTEXT: 'We are excited about the opportunity to partner with your organization and help you achieve your goals. Contact us today to learn more about how Digital Aid Seattle can help your nonprofit thrive in the digital age.',

}

const processContent = [
  { title: LABELS.PROCESS_STEP_TITLE_1, description: LABELS.PROCESS_STEP_1 },
  { title: LABELS.PROCESS_STEP_TITLE_2, description: LABELS.PROCESS_STEP_2 },
  { title: LABELS.PROCESS_STEP_TITLE_3, description: LABELS.PROCESS_STEP_3 },
  { title: LABELS.PROCESS_STEP_TITLE_4, description: LABELS.PROCESS_STEP_4 },
  { title: LABELS.PROCESS_STEP_TITLE_5, description: LABELS.PROCESS_STEP_5 }
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

const benefitsContent = [
  {
    title: LABELS.BENEFIT_CARD_TITLE_1,
    description: LABELS.BENEFIT_CARD_TEXT_1,
    icon: <ContentCutOutlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.BENEFIT_CARD_TITLE_1,
    description: LABELS.BENEFIT_CARD_TEXT_2,
    icon: <Diversity3Outlined style={ICON_STYLE} />,
  },
  {
    title: LABELS.BENEFIT_CARD_TITLE_3,
    description: LABELS.BENEFIT_CARD_TEXT_3,
    icon: <HandshakeOutlined style={ICON_STYLE} />,
  },
]
const AIRTABLE_FORM = 'https://airtable.com/app6duHw2djMIOYnh/paguUW1sRDdwsPdWN/form';

const cardStyles = {
  boxShadow: '0px 6px 12px 0px #5660611F'
};

const HeroSection: React.FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  return (
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
  );
}

const WhatIsAPartnerSection: React.FC = () => {
  return (
    <Stack
      sx={{
        gap: { xs: 3, lg: 10 },
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: { sm: 4, lg: 10 },
      }}
      maxWidth={'880px'}
    >
      <Typography variant="headlineLarge" component="h2">
        {LABELS.WHAT_IS_A_PARTNER_TITLE}
      </Typography>
      <Typography textAlign={'center'} >
        {LABELS.WHAT_IS_A_PARTNER_TEXT}
      </Typography>
    </Stack>
  )
}

const CriteriaSection: React.FC = () => {
  return (
    <>
      <Typography variant="headlineLarge" component="h2">
        {LABELS.CRITERIA_TITLE}
      </Typography>

      <CardGridContainer columns={criteriaContent.length}>
        {criteriaContent.map((item) => (
          <CardOne
            smallerTitle
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            cardStyles={cardStyles}
          />
        ))}
      </CardGridContainer>
    </>
  )
}

const HowWeCanHelpSection: React.FC = () => {
  return (
    <>
      <Typography variant="headlineLarge" component="h2">
        {LABELS.HOW_HELP_TITLE}
      </Typography>
      <CardGridContainer columns={1}>
        {provideContent.map((item) => (
          <CardHorizontal
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </CardGridContainer>
    </>
  )
}

const WhatWeDoSection: React.FC = () => {
  return (
    <Stack
      sx={{
        gap: { xs: 3, lg: 10 },
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: { sm: 4, lg: 10 },
      }}
      maxWidth={'880px'}
    >
      <Typography variant="headlineLarge" component="h2">
        {LABELS.WHAT_WE_DO_LABEL}
      </Typography>
      <Typography textAlign={'center'} >
        {LABELS.WHAT_WE_DO_TXT}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        href={'/cadre'}
      >
        {LABELS.LEADERSHIP_BTN}
      </Button>
    </Stack>
  )
}

const ProcesSection: React.FC = () => {
  const theme = useTheme()

  return (
    <>
      <Stack gap={{ xs: 2, md: 4 }} sx={{
        textAlign: 'left',
      }}>
        <Typography variant="headlineLarge" component="h2">
          {LABELS.PROCESS_TITLE}
        </Typography>
        <Typography textAlign={'left'} >
          {LABELS.PROCESS_TEXT}
        </Typography>
        <ol>
          {processContent.map((item, index) => (
            <li key={index + 1} style={{ marginBottom: '2rem' }}>
              <Typography
                variant="titleLarge"
                color={theme.palette.primary.main}
              >{`${index + 1}.`}</Typography>
              <Typography
                variant="bodyLarge"
                color={theme.palette.primary.main}
                fontWeight={600}
                marginLeft={2}
              >{item.title}: </Typography>
              <Typography variant="bodyLarge" >
                {item.description}
              </Typography>
            </li>
          ))}
        </ol>
        <Box>
          <Button
            variant="contained"
            color="primary"
            href={AIRTABLE_FORM}
            target="_blank"
          >
            {LABELS.PARTNER_BTN}
          </Button>
        </Box>
      </Stack>
    </>
  )
}

const BenefitsSection: React.FC = () => {
  return (
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        textAlign: 'center',
      }}
      maxWidth={'880px'}
    >
      <Typography variant="headlineLarge" component="h2">
        {LABELS.BENEFITS_TITLE}
      </Typography>

      <Typography variant="subtitle1" fontWeight={600}>
        {LABELS.BENEFITS_SUBTITLE}
      </Typography>

      <CardGridContainer columns={benefitsContent.length}>
        {benefitsContent.map((item) => (
          <CardOne
            smallerTitle
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            cardStyles={cardStyles}
          />
        ))}
      </CardGridContainer>

      <Button
        variant="contained"
        color="primary"
        href={AIRTABLE_FORM}
        target="_blank"
        sx={{
          alignSelf: 'center',
        }}
      >
        {LABELS.PARTNER_BTN}
      </Button>

      <Typography variant="headlineLarge" component="h2">
        {LABELS.BENEFITS_TAGLINE}
      </Typography>

      <Typography variant="bodyMedium">
        {LABELS.BENEFITS_TAGTEXT}
      </Typography>
    </Stack>
  )
}

const InterestedSection: React.FC = () => {
  return (
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
  )
}

const PartnersPage = () => {
  const theme = useTheme()

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
  }, [initialized, setLoading])

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <HeroSection />
      <SectionContainer backgroundColor={theme.palette.background.paper}>
        <WhatIsAPartnerSection />
      </SectionContainer>
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '64px', md: '80px' }}
          sx={{
            textAlign: 'center',
          }}
          maxWidth={'880px'}
        >
          <CriteriaSection />
          <HowWeCanHelpSection />
        </Stack>
      </SectionContainer>
      <SectionContainer backgroundColor={theme.palette.background.paper}>
        <Stack
          gap={{ xs: '64px', md: '80px' }}
          sx={{
            textAlign: 'center',
          }}
          maxWidth={'880px'}
        >
          <WhatWeDoSection />
          <ProcesSection />
        </Stack>
      </SectionContainer>
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <BenefitsSection />
      </SectionContainer>
      <SectionContainer backgroundColor={theme.palette.background.paper}>
        <InterestedSection />
      </SectionContainer>
    </Container>
  )
}

export default withBasicLayout(PartnersPage)
