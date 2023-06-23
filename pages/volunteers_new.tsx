import { Box, Container, Stack, Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

import VolunteerImage from '../assets/volunteerWithUs.png'
/* eslint-disable @next/next/no-img-element */

const VolunteerPage = () => {
  const theme = useTheme()

  return (
    <>
      <Container
        sx={{ backgroundColor: theme.palette.primary.main, alignItems:'center', display:'flex', flexDirection:'column', paddingY: '5rem'}}
        maxWidth={false}
      >
        <Box sx={{display:'flex', flexDirection:{xs:'column',md:'row'}, alignItems:'center'  }}>
          <Box sx={{width:'50%', textAlign:'left'}} maxWidth={'422px'}>
            <Typography
              variant="displayLarge"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Volunteer With Us
            </Typography>
            <Typography
              variant="headlineLarge"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Join Open Seattle to make a difference in the lives of others! We
              have a wide range of volunteer opportunities available.
            </Typography>
          </Box>
          <Box sx={{width:'50%'}} maxWidth={'422px'}>

          <img src={VolunteerImage.src} alt='Volunteer page graphic' style={{objectFit:'cover'}}></img>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default withBasicLayout(VolunteerPage)
