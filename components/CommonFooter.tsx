/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Container, Grid, Stack, styled, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { theme } from 'theme/theme'

import OSLogo from '../assets/darkThemeLogo.svg'

const Item = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.primary.contrastText,
}))

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
    <Typography>{props.name}</Typography>
  </Link>
)

const SubText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
}))

const CommonFooter = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '1rem 0rem' }}>
      <Grid container spacing={5} alignItems="center">
        {/* LOGO */}
        <GridItem xs={3}>
          <img
            src={OSLogo.src}
            style={{
              height: '80%',
              width: '120px',
              margin: '0rem 0rem 1rem',
            }}
          />
          <SubText>Illustration by: Kylie Melendez</SubText>
          <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
        </GridItem>

        <GridItem xs={4}>
          <FooterItemTitle>Contact us</FooterItemTitle>
          <a href="mailto:name@email.com">
            <FooterSubItem>info@openseattle.org</FooterSubItem>
          </a>
        </GridItem>
        <GridItem xs={4}>
          <Stack direction="column" spacing={2}>
            <Item>
              <FooterItemTitle>Work with us</FooterItemTitle>
              <LinkSubItem url="/volunteers_new" name="Volunteers" />
              <LinkSubItem url="/partners_new" name="Partners" />
            </Item>
            <Item>
              <FooterItemTitle>About</FooterItemTitle>
              <LinkSubItem url="/privacy-policy" name="Privacy Policy" />
            </Item>
          </Stack>
        </GridItem>
        <GridItem xs={1}>
          <Stack direction="column" spacing={2}>
            <Item>
              <a href="https://github.com/openseattle">
                <GitHubIcon
                  sx={{ color: theme.palette.primary.contrastText }}
                />
              </a>
            </Item>
            <Item>
              <a href="https://www.linkedin.com/company/open-seattle/">
                <LinkedInIcon
                  sx={{ color: theme.palette.primary.contrastText }}
                />
              </a>
            </Item>
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  )
}
export default CommonFooter
