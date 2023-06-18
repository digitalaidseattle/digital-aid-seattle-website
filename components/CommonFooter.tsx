/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Container, Grid, Stack, styled, Typography } from '@mui/material'
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
            }}
          />
          <SubText>Illustration by: Kylie Melendez</SubText>
          <FooterItemTitle>@ Open Seattle 2023</FooterItemTitle>
        </GridItem>

        <GridItem xs={4}>
          <FooterItemTitle>Contact us</FooterItemTitle>
          <FooterSubItem>info@openseattle.org</FooterSubItem>
        </GridItem>
        <GridItem xs={4}>
          <Stack direction="column" spacing={2}>
            <Item>
              <FooterItemTitle>Work with us</FooterItemTitle>
              <FooterSubItem>Volunteer</FooterSubItem>
              <FooterSubItem>Partner</FooterSubItem>
            </Item>
            <Item>
              <FooterItemTitle>About</FooterItemTitle>
              <FooterSubItem>Privacy Policy</FooterSubItem>
            </Item>
          </Stack>
        </GridItem>
        <GridItem xs={1}>
          <GitHubIcon sx={{ color: theme.palette.primary.contrastText }} />
          <LinkedInIcon sx={{ color: theme.palette.primary.contrastText }} />
        </GridItem>
      </Grid>
    </Container>
  )
}
export default CommonFooter
