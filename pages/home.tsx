import { NextPage } from 'next'
import { Box, Button, Container, Typography, useTheme } from '@mui/material'
import Image from 'next/image'

interface Props {}

const Home: NextPage<Props> = () => {
  const theme = useTheme()
  const palette = theme.palette
  const loader = ({ src }) => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}`
  }
  return (
    <>
      <Container
        sx={{
          height: '100vh',
          overflow: 'auto',
          backgroundColor: palette.primary.dark,
          // marginLeft: 0,
          // marginRight: 0,
          maxWidth: '100vw',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              color={'text.secondary'}
              sx={{ paddingBottom: '56px' }}
              variant="displayLarge"
            >
              Connecting Puget Sound nonprofits with free tech solutions.
            </Typography>
            <Box>
              <Button variant="contained" color="secondary">
                Get Help
              </Button>
              <Button variant="contained" color="primary">
                Volunteer With Us
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                height: '424px',
                width: '424px',
              }}
            >
              <Image
                src="/seattle_4.jpg"
                loader={loader}
                fill={true}
                objectFit="cover"
                alt="Seattle skyline by Stephen Plopper"
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Container sx={{backgroundColor:'background'}}>
        <Box
          sx={{
            height: '536px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginLeft: '200px',
            marginRight: '200px',
          }}
        >
          <Typography variant="headlineLarge">Our Mission</Typography>
          <Typography variant="bodyLarge">
            We believe community organizations are the heart of Seattle, and
            deserve the same tools and advantages enjoyed by our largest tech
            companies. Our mission is to create scalable, customized solutions
            to enable other nonprofits to reach their full potential and achieve
            their own mission-driven goals.
          </Typography>
          <Button variant="contained" color="primary">
            Learn About Us
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Home
