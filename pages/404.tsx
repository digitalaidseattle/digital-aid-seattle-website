/*
* @2023 Open Seattle
*/
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
import ErrorImage from '../assets/404-error.png'

// Promote, if we want to handle other error types
type ErrorComponentProps = {
  title: string,
  description: string,
  imageSrc: string,
  imageTitle: string,
}
const ErrorComponent = ({ title, description, imageSrc, imageTitle }: ErrorComponentProps) => {

  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  return <SectionContainer backgroundColor={theme.palette.background}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: '40px' },
      }}>
      <Box
        sx={{
          textAlign: 'left',
          width: '100%',
          maxWidth: largeScreen ? '418px' : '950px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
        <Typography
          variant={smallScreen ? 'displayMedium' : 'displayLarge'}>
          {title}
        </Typography>
        <Typography variant="bodyLarge" >
          {description}
        </Typography>
        <Box >
          <Button
            title="Back Home"
            variant="contained"
            color="primary"
            href="/"
          >
            Back Home
          </Button>
        </Box>
      </Box>
      <img
        src={imageSrc}
        alt={imageTitle}
        width="418px"
        style={{ objectFit: 'cover' }}
      />
    </Box>
  </SectionContainer>
}

function Page404() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ErrorComponent title="Page Not Found"
        description="Unfortunately, the page you are trying to access could not be located. Please return to our home page to continue your journey."
        imageSrc={ErrorImage.src}
        imageTitle="404 Error Image" />
    </Container>
  )
}

export default withBasicLayout(Page404)
