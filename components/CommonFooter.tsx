/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Container, Grid, Box, styled, Typography } from '@mui/material'
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
  fontSize: '0.875rem',
  marginBottom: '1rem',
}))

const FooterSubItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '1rem',
  lineHeight: '2rem',
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
  <Grid container direction="row" rowGap="2.5rem">
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

    <GridItem md={1} display="flex" flexDirection="row">
      <Box
        sx={{
          marginLeft: 'auto',
          alignSelf: 'flex-end',
        }}
      >
        <a href="https://www.linkedin.com/company/open-seattle/">
          <LinkedInIcon
            sx={{ color: theme.palette.primary.contrastText }}
            fontSize="large"
          />
        </a>
      </Box>
    </GridItem>

    <GridItem md={3}>
      <SubText>Illustrations by: Storyset by Freepik</SubText>
      <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>Support us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:name@email.com">How can you help</a>
      </FooterSubItem>
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>About Open Seattle</FooterItemTitle>
      <LinkSubItem url="/privacy-policy" name="Privacy Policy" />
    </GridItem>

    <GridItem md={1} display="flex" flexDirection="column">
      <Box sx={{ alignSelf: 'flex-end' }}>
        <a href="https://github.com/openseattle">
          <GitHubIcon
            sx={{ color: theme.palette.primary.contrastText }}
            fontSize="large"
          />
        </a>
      </Box>
    </GridItem>
  </Grid>
)

const CommonFooterSmallScreen = () => (
  <Grid
    container
    direction="column"
    columns={1}
    sx={{ alignItems: 'center', textAlign: 'center', gap: '4rem' }}
  >
    {/* LOGO */}
    <GridItem>
      <img
        src={OSLogo.src}
        style={{
          height: '100%',
          width: '120px',
        }}
      />
    </GridItem>

    <GridItem>
      <FooterItemTitle>Work with us</FooterItemTitle>
      <LinkSubItem url="/volunteers_new" name="Volunteers" />
      <LinkSubItem url="/partners_new" name="Partners" />
    </GridItem>

    <GridItem>
      <FooterItemTitle>Contact us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:name@email.com">info@openseattle.org</a>
      </FooterSubItem>
    </GridItem>

    <GridItem>
      <FooterItemTitle>Support us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:name@email.com">How can you help</a>
      </FooterSubItem>
    </GridItem>

    <GridItem>
      <FooterItemTitle>About Open Seattle</FooterItemTitle>
      <LinkSubItem url="/privacy-policy" name="Privacy Policy" />
    </GridItem>

    <GridItem display="flex" sx={{ gap: '1rem' }}>
      <a href="https://www.linkedin.com/company/open-seattle/">
        <LinkedInIcon
          sx={{ color: theme.palette.primary.contrastText }}
          fontSize="large"
        />
      </a>
      <a href="https://github.com/openseattle">
        <GitHubIcon
          sx={{ color: theme.palette.primary.contrastText }}
          fontSize="large"
        />
      </a>
    </GridItem>

    <GridItem display="flex" flexDirection="column" sx={{ gap: '1rem' }}>
      <SubText>Illustrations by: Storyset by Freepik</SubText>
      <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
    </GridItem>
  </Grid>
)

const CommonFooter = () => {
  return (
    <>
      <Container
        sx={{
          padding: '5rem 0rem',
          display: {
            md: 'flex',
            xs: 'none',
          },
        }}
      >
        <CommonFooterMidScreen />
      </Container>

      <Container
        sx={{ padding: '4rem 0rem', display: { md: 'none', xs: 'flex' } }}
      >
        <CommonFooterSmallScreen />
      </Container>
    </>
  )
}
export default CommonFooter
