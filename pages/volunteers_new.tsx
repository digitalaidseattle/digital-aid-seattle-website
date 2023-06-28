import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

import { withBasicLayout } from 'components/layouts'
import { ListItemWithIcon } from 'components/ListItemWithIcon'

import VolunteerImage from '../assets/volunteerWithUs.png'
import {
  Campaign,
  Code,
  DataObject,
  DrawOutlined,
  Gavel,
  PeopleAlt,
  ScreenSearchDesktop,
  Storage,
} from '@mui/icons-material'

/* eslint-disable @next/next/no-img-element */

const gridContent = [ 
  {label: 'Front-end Development', icon: <Code/>}, 
  {label: 'Data Science', icon: <Storage/>}, 
  {label: 'Back-end Development', icon: <DataObject/>}, 
  {label: 'Marketing', icon: <Campaign/>},
  {label: 'UX / UI Design', icon: <DrawOutlined/>}, 
  {label: 'Operations/Project Management', icon: <PeopleAlt/>}, 
  {label: 'UX Research', icon: <ScreenSearchDesktop/>}, 
  {label: 'Legal Counsel', icon: <Gavel/>}, 
]

const VolunteerPage = () => {
  const theme = useTheme()

  return (
    <>
      <Container
        sx={{
          backgroundColor: theme.palette.primary.main,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          paddingY: '5rem',
        }}
        maxWidth={false}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '50%', textAlign: 'left' }} maxWidth={'422px'}>
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
          <Box sx={{ width: '50%' }} maxWidth={'422px'}>
            <img
              src={VolunteerImage.src}
              alt="Volunteer page graphic"
              style={{ objectFit: 'cover' }}
            ></img>
          </Box>
        </Box>
      </Container>
      <Container>
        <Grid columns={{ xs: 1, md: 2 }}>
          {gridContent.map((item) => (
            <ListItemWithIcon
              key={item.label}
              icon={item.icon}
              label={item.label}
            />
            ))}
        </Grid>
      </Container>
    </>
  )
}

export default withBasicLayout(VolunteerPage)
