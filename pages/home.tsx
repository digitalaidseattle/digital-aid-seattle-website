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
              variantMapping={{ h1: 'displayLarge' }}
            >
              Connecting Puget Sound nonprofits with free tech solutions.
            </Typography>
            <Box>
              <Button variant="outlined" color="secondary">
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
      <Container>
        <Typography variant="h1">Hello World</Typography>
      </Container>
    </>
  )
}

export default Home
