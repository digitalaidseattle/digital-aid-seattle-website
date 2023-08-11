/*
* @2023 Open Seattle
*/
import { Box, Container, Link, Stack, Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'
import ErrorImage from '../assets/404-error.png'
import SectionContainer from 'components/layout/SectionContainer'

function Page404() {
  const theme = useTheme()
  const palette = theme.palette

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <SectionContainer backgroundColor={theme.palette.background}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: { xs: 4, md: '40px' },
            }}
          >
            <Box
              sx={{
                textAlign: 'left',
                width: '100%',
                maxWidth: '418px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              <img
                src={ErrorImage.src}
                alt="404 Error graphic"
                width="418px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Container id="aasd">
              <Typography variant="bodyLarge">
                {"The page you're trying to access couldn't be located. Please click here to return to our "}
                <Link
                  href="/"
                  className="font-body leading-6 "
                >
                  homepage
                </Link>
                .
              </Typography>
            </Container>
          </Container>
        </SectionContainer>
      </Container>
    </ >
  )
}

export default withBasicLayout(Page404)
