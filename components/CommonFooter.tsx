/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Box, Container, Grid, styled, Typography } from '@mui/material'
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
}))

const FooterSubItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '1rem',
  marginTop: '1rem',
  display: 'block',
}))

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

const SubText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
}))

const CommonFooterLargeScreen = () => (
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
        <a href="mailto:info@openseattle.org">info@openseattle.org</a>
      </FooterSubItem>
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>Work with us</FooterItemTitle>
      <LinkSubItem url="/partners" name="Partner" />
      <LinkSubItem url="/volunteers" name="Volunteer" />
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
        <a href="mailto:info@openseattle.org">How you can help</a>
      </FooterSubItem>
    </GridItem>

    <GridItem md={4}>
      <FooterItemTitle>About Open Seattle</FooterItemTitle>
      <LinkSubItem url="/privacy" name="Privacy Policy" />
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

const CommonFooterMidScreen = () => (
  <Grid container direction="column" columns={3}>
    {/* LOGO */}
    <GridItem md={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <img
          src={OSLogo.src}
          style={{
            height: 'auto',
            width: '120px',
          }}
        />

        <Box>
          <FooterItemTitle>Contact us</FooterItemTitle>
          <FooterSubItem>
            <a href="mailto:info@openseattle.org">info@openseattle.org</a>
          </FooterSubItem>
        </Box>

        <Box>
          <SubText>Illustrations by: Storyset by Freepik</SubText>
          <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
        </Box>
      </Box>
    </GridItem>

    <GridItem md={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box>
          <FooterItemTitle>Work with us</FooterItemTitle>

          <LinkSubItem url="/partners" name="Partner" />

          <LinkSubItem url="/volunteers" name="Volunteer" />
        </Box>

        <Box>
          <FooterItemTitle>Support us</FooterItemTitle>
          <FooterSubItem>
            <a href="mailto:info@openseattle.org">How you can help</a>
          </FooterSubItem>
        </Box>

        <Box>
          <FooterItemTitle>About Open Seattle</FooterItemTitle>
          <LinkSubItem url="/privacy" name="Privacy Policy" />
        </Box>
      </Box>
    </GridItem>

    <GridItem md={4} display="flex">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
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
          height: '3rem',
          width: 'auto',
        }}
      />
    </GridItem>

    <GridItem>
      <FooterItemTitle>Work with us</FooterItemTitle>
      <LinkSubItem url="/partners" name="Partner" />
      <LinkSubItem url="/volunteers" name="Volunteer" />
    </GridItem>

    <GridItem>
      <FooterItemTitle>Contact us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:info@openseattle.org">info@openseattle.org</a>
      </FooterSubItem>
    </GridItem>

    <GridItem>
      <FooterItemTitle>Support us</FooterItemTitle>
      <FooterSubItem>
        {/* TODO Update to support-us page, when the page is added */}
        <a href="mailto:info@openseattle.org">How you can help</a>
      </FooterSubItem>
    </GridItem>

    <GridItem>
      <FooterItemTitle>About Open Seattle</FooterItemTitle>
      <LinkSubItem url="/privacy" name="Privacy Policy" />
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
            lg: 'flex',
            xs: 'none',
          },
        }}
      >
        <CommonFooterLargeScreen />
      </Container>

      <Container
        sx={{
          padding: '4rem 2rem',
          display: { xs: 'none', md: 'flex', lg: 'none' },
          height: '29rem',
        }}
      >
        <CommonFooterMidScreen />
      </Container>

      <Container
        sx={{ padding: '4rem 0rem', display: { xs: 'flex', md: 'none' } }}
      >
        <CommonFooterSmallScreen />
      </Container>
    </>
  )
}
export default CommonFooter
