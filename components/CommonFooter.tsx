/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Container, Grid, Stack, styled, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { theme } from 'theme/theme'

import OSLogo from '../assets/darkThemeLogo.svg'

const GridItem = styled(Grid)(() => ({
  item: true,
  padding: '0.5rem',
  justifyContent: 'left',
  alignItems: 'center',
}))

const FooterItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
  fontSize: '0.875rem'
}))

const FooterSubItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '1rem'
}))

const LinkSubItem = (props: { url: string; name: string }) => (
  <Link
    sx={{
      color: theme.palette.primary.contrastText,
    }}
    underline="hover"
    href={props.url}
  >
    <Typography fontSize={'1rem'}>{props.name}</Typography>
  </Link>
)

const SubText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
}))

const CommonFooterMidScreen = () => (
  <Grid container spacing={5} direction="row">
    {/* LOGO */}
    <GridItem md={3}>
      <img
        src={OSLogo.src}
        style={{
          height: '80%',
          width: '120px',
        }}
      />
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>Contact us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:name@email.com">info@openseattle.org</a>
      </FooterSubItem>
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>Work with us</FooterItemTitle>
      <LinkSubItem url="/volunteers_new" name="Volunteers" />
      <LinkSubItem url="/partners_new" name="Partners" />
    </GridItem>

    <GridItem md={1} display="flex">
      <a href="https://www.linkedin.com/company/open-seattle/">
        <LinkedInIcon
          sx={{ color: theme.palette.primary.contrastText }}
          fontSize="large"
        />
      </a>
    </GridItem>

    <GridItem md={3}>
      <SubText>Illustration by: Kylie Melendez</SubText>
      <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>Support us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:name@email.com">How can you help</a>
      </FooterSubItem>
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>About</FooterItemTitle>
      <LinkSubItem url="/privacy-policy" name="Privacy Policy" />
    </GridItem>

    <GridItem md={1} display="flex">
      <a href="https://github.com/openseattle">
        <GitHubIcon
          sx={{ color: theme.palette.primary.contrastText }}
          fontSize="large"
        />
      </a>
    </GridItem>
  </Grid>
)

const CommonFooterSmallScreen = () => (
  <Grid container spacing={5} direction="row">
    {/* LOGO */}
    <GridItem xs={5}>
      <img
        src={OSLogo.src}
        style={{
          height: '80%',
          width: '120px',
        }}
      />
    </GridItem>

    <GridItem xs={5}>
      <FooterItemTitle>Work with us</FooterItemTitle>
      <LinkSubItem url="/volunteers_new" name="Volunteers" />
      <LinkSubItem url="/partners_new" name="Partners" />
    </GridItem>

    <GridItem xs={2} display="flex">
      <></>
    </GridItem>

    <GridItem xs={5}>
      <FooterItemTitle>Contact us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:name@email.com">info@openseattle.org</a>
      </FooterSubItem>
    </GridItem>

    <GridItem xs={5}>
      <FooterItemTitle>Support us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:name@email.com">How can you help</a>
      </FooterSubItem>
    </GridItem>

    <GridItem xs={2} display="flex">
      <a href="https://www.linkedin.com/company/open-seattle/">
        <LinkedInIcon
          sx={{ color: theme.palette.primary.contrastText }}
          fontSize="large"
        />
      </a>
    </GridItem>

    <GridItem xs={5}>
      <SubText>Illustration by: Kylie Melendez</SubText>
      <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
    </GridItem>

    <GridItem xs={5}>
      <FooterItemTitle>About</FooterItemTitle>
      <LinkSubItem url="/privacy-policy" name="Privacy Policy" />
    </GridItem>

    <GridItem xs={2} display="flex">
      <a href="https://github.com/openseattle">
        <GitHubIcon
          sx={{ color: theme.palette.primary.contrastText }}
          fontSize="large"
        />
      </a>
    </GridItem>
  </Grid>
)

const CommonFooter = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{ padding: '2rem 0rem', display: { md: 'flex', xs: 'none' } }}
      >
        <CommonFooterMidScreen />
      </Container>

      <Container
        maxWidth="lg"
        sx={{ padding: '2rem 0rem', display: { md: 'none', xs: 'flex' } }}
      >
        <CommonFooterSmallScreen />
      </Container>
    </>
  )
}
export default CommonFooter
