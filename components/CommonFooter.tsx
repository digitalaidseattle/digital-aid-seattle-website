/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */

import { Box, Container, Grid, Stack, styled, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { theme } from 'theme/theme'

import { ReactNode } from 'react'
import OSLogo from '../assets/darkThemeLogo.svg'
import EmailFormContainer from './email-form/EmailFormContainer'
import { useFeature } from 'pages/api/FeatureService'
import { GitHub, LinkedIn, Facebook, Instagram } from '@mui/icons-material'

// const GridItem = styled(Grid)(() => {
//   return {
//     item: true,
//     padding: '0.5rem',
//     justifyContent: 'left',
//     alignItems: 'center'
//   }
// })

const SubText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
}))

const FooterItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
  fontSize: '0.875rem',
}))

type GridItemProps = {
  children: ReactNode
  md?: number
}

const GridItem = ({ md, children }: GridItemProps) =>
  md ? (
    <Grid
      item={true}
      padding="0.5rem"
      justifyContent="left"
      alignItems="center"
      md={md}
    >
      {children}
    </Grid>
  ) : (
    <Grid
      item={true}
      padding="0.5rem"
      justifyContent="left"
      alignItems="center"
    >
      {children}
    </Grid>
  )

const LinkSubItem = (props: { url: string; name: string }) => (
  <Link
    sx={{
      color: theme.palette.primary.contrastText,
      marginTop: '1rem',
      display: 'block',
    }}
    underline="hover"
    href={props.url}
  >
    <Typography fontSize={'1rem'}>{props.name}</Typography>
  </Link>
)

const LogoBox = () => {
  return (
    <Box>
      <Link href="/" title="Go back to home" aria-label="Go back to home">
        <img src={OSLogo.src} width="120px" alt="Digital Aid Seattle Logo" />
      </Link>
    </Box>
  )
}

const AboutBox = () => {
  const { data: faq } = useFeature('faq')
  return (
    <Box>
      <FooterItemTitle>About Us</FooterItemTitle>
      <LinkSubItem url="/privacy" name="Privacy Policy" />
      {faq && <LinkSubItem url="/faq" name="FAQ" />}
    </Box>
  )
}

const ContactUsBox = () => {
  return (
    <Box>
      <FooterItemTitle>Contact us</FooterItemTitle>
      <LinkSubItem url="mailto:info@digitalaidseattle.org" name="info@digitalaidseattle.org" />
    </Box>
  )
}

const WorkWithUsBox = () => {
  return (
    <Box>
      <FooterItemTitle>Work with us</FooterItemTitle>
      <LinkSubItem url="/partners" name="Partner" />
      <LinkSubItem url="/volunteers" name="Volunteer" />
      <LinkSubItem url="/support_us" name="Donate" />
    </Box>
  )
}

const CopyrightBox = () => {
  return (
    <Stack gap="1rem">
      <SubText>
        Illustrations by{' '}
        <Link
          href="https://storyset.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Storyset, which opens in a new window."
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Storyset
        </Link>
      </SubText>
      <FooterItemTitle>© Digital Aid Seattle 2024</FooterItemTitle>
    </Stack>
  )
}

const linkedInLink = () => {
  return (
    <Link
      href="https://www.linkedin.com/company/digitalseattle/"
      target="_blank"
      rel="noopener noreferrer"
      title="LinkedIn"
      aria-label="Our LinkedIn, which opens in a new window."
    >
      <LinkedIn
        sx={{ color: theme.palette.primary.contrastText }}
        fontSize="large"
      />
    </Link>
  )
}

const githubLink = () => {
  return (
    <Link
      href="https://github.com/digitalaidseattle"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
      aria-label="Our GitHub, which opens in a new window."
    >
      <GitHub
        sx={{ color: theme.palette.primary.contrastText }}
        fontSize="large"
      />
    </Link>
  )
}

const facebookLink = () => {
  return (
    <Link
      href="https://facebook.com/digitalaidseattle"
      target="_blank"
      rel="noopener noreferrer"
      title="Facebook"
      aria-label="Our Facebook page, which opens in a new window."
    >
      <Facebook
        sx={{ color: theme.palette.primary.contrastText }}
        fontSize="large"
      />
    </Link>
  )
}

const instagramLink = () => {
  return (
    <Link
      href="https://instagram.com/digitalaidseattle"
      target="_blank"
      rel="noopener noreferrer"
      title="Instagram"
      aria-label="Our Instagram page, which opens in a new window."
    >
      <Instagram
        sx={{ color: theme.palette.primary.contrastText }}
        fontSize="large"
      />
    </Link>
  )
}

const START_BOX_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
  gap: '2rem',
}

const CommonFooterLargeScreen = () => {
  const { data: newsLetter } = useFeature('newsletter')

  return (
    <Stack>
      {newsLetter && <EmailFormContainer />}
      <Box
        sx={{
          paddingY: '5rem',
          height: '28rem'
        }}
      >
        <Grid container spacing={4}>
          <GridItem md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              <LogoBox />
            </Box>
          </GridItem>

          <GridItem md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <WorkWithUsBox />
            </Box>
          </GridItem>

          <GridItem md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <AboutBox />
            </Box>
          </GridItem>

          <GridItem md={4}>
            <Box sx={START_BOX_STYLE}>
            </Box>
          </GridItem>

          <GridItem md={4}>
            <Box sx={START_BOX_STYLE}>
              <ContactUsBox />
            </Box>
          </GridItem>

          <GridItem md={4}>
            <Box sx={START_BOX_STYLE}>
            </Box>
          </GridItem>

          <GridItem md={4}>
            <Box sx={START_BOX_STYLE}>
              <CopyrightBox />
            </Box>
          </GridItem>
          <GridItem md={8}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2rem',
                alignItems: 'flex-end',
              }}
            >
              <Box >
                <FooterItemTitle>Follow us on social media</FooterItemTitle>
                <Stack direction={'row'} marginTop={1} spacing={2}>
                  {linkedInLink()}
                  {githubLink()}
                  {facebookLink()}
                  {instagramLink()}
                </Stack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Stack>)
}

const CommonFooterSmallScreen = () => {
  const { data: newsLetter } = useFeature('newsletter')

  return (
    <Grid
      container
      direction="column"
      columns={1}
      sx={{ alignItems: 'center', textAlign: 'center', paddingY: '4rem', gap: '2rem' }}
    >
      <GridItem><LogoBox /></GridItem>
      {newsLetter && <EmailFormContainer />}
      <GridItem><WorkWithUsBox /></GridItem>
      <GridItem><AboutBox /></GridItem>
      <GridItem><ContactUsBox /></GridItem>
      <GridItem>
        <FooterItemTitle>Follow us on social media</FooterItemTitle>
        <Box display="flex" sx={{ gap: '1rem', marginTop: '1rem' }}>
          {linkedInLink()}
          {githubLink()}
          {facebookLink()}
          {instagramLink()}
        </Box>
      </GridItem>
      <GridItem><CopyrightBox /></GridItem>
    </Grid>
  )
}

const CommonFooter = () => {
  return (
    <Container>
      <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'flex' } }}>
        <CommonFooterLargeScreen />
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none', lg: 'none' } }}>
        <CommonFooterSmallScreen />
      </Box>
    </Container >
  )
}
export default CommonFooter
