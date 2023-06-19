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
  justify: 'center',
}))

const FooterItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
}))

const FooterSubItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
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

const CommonFooter = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '2rem 0rem' }}>
      <Grid container spacing={5} direction="row" justifyContent="center">
        {/* LOGO */}
        <GridItem xs={3}>
          <img
            src={OSLogo.src}
            style={{
              height: '80%',
              width: '120px',
            }}
          />
        </GridItem>

        <GridItem xs={4}>
          <FooterItemTitle>Contact us</FooterItemTitle>
          <FooterSubItem>
            <a href="mailto:name@email.com">info@openseattle.org</a>
          </FooterSubItem>
        </GridItem>

        <GridItem xs={4}>
          <FooterItemTitle>Work with us</FooterItemTitle>
          <LinkSubItem url="/volunteers_new" name="Volunteers" />
          <LinkSubItem url="/partners_new" name="Partners" />
        </GridItem>

        <GridItem xs={1}>
          <a href="https://github.com/openseattle">
            <GitHubIcon sx={{ color: theme.palette.primary.contrastText }} />
          </a>
        </GridItem>

        <GridItem xs={3}>
          <SubText>Illustration by: Kylie Melendez</SubText>
          <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
        </GridItem>

        <GridItem xs={4}>
          <FooterItemTitle>Support us</FooterItemTitle>
          <FooterSubItem>
            <a href="mailto:name@email.com">How can you help</a>
          </FooterSubItem>
        </GridItem>

        <GridItem xs={4}>
          <FooterItemTitle>About</FooterItemTitle>
          <LinkSubItem url="/privacy-policy" name="Privacy Policy" />
        </GridItem>

        <GridItem xs={1}>
          <a href="https://www.linkedin.com/company/open-seattle/">
            <LinkedInIcon sx={{ color: theme.palette.primary.contrastText }} />
          </a>
        </GridItem>
      </Grid>
    </Container>
  )
}
export default CommonFooter
