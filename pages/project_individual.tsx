import {
  Typography,
  useTheme,
  Container,
  Stack,
  styled,
  Box,
  Button,
} from '@mui/material'
import { withBasicLayout } from 'components/layouts'
import StateButton from 'components/cards/StateButton'
import CardWithPhoto from 'components/cards/CardWithPhoto'
import ListItemWithIcon from 'components/list/ListItemWithIcon'
import useMediaQuery from '@mui/material/useMediaQuery'

// imports for placeholders-- delete as needed
import Placeholder from 'assets/placeholder-person.png'
import DataObjectIcon from '@mui/icons-material/DataObject'
import ProjectPlaceholder from 'assets/project-image.png'

const ProjectIndividualPage = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  const Subheader = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginBottom: '2rem',
  }))

  const Section = styled(Stack)(({ theme }) => ({
    paddingTop: '4rem',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '12.5rem',
      paddingRight: '12.5rem',
    },
  }))

  function MobileHeader() {
    return (
      <Container
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: { xs: '4rem 1rem 12rem 1rem', md: '2rem' },
          color: theme.palette.primary.contrastText,
          position: 'relative',
        }}
        maxWidth={false}
      >
        <Stack spacing="2rem">
          <Stack>
            <Typography variant="displayMedium">Project Title</Typography>
            <Typography variant="headlineMedium">Partner Name</Typography>
          </Stack>
          <Stack spacing="1rem">
            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">Project Status:</Typography>
              <StateButton state="active" />
            </Stack>
            <Typography variant="labelLarge">
              Expected Timeline: Ongoing
            </Typography>
          </Stack>
        </Stack>
        <img
          src={ProjectPlaceholder.src}
          style={{
            position: 'absolute',
            bottom: '-8rem',
            left: '0',
            right: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '18rem',
            height: '18rem',
          }}
        />
      </Container>
    )
  }

  function DesktopHeader() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            paddingTop: '14.5rem',
            paddingBottom: '2.5rem',
            paddingLeft: '12.5rem',
            paddingRight: '12.5rem',
            color: theme.palette.primary.contrastText,
            position: 'relative',
          }}
        >
          <Stack spacing="2rem">
            <Stack>
              <Typography variant="displayMedium">Project Title</Typography>
              <Typography variant="headlineMedium">Partner Name</Typography>
            </Stack>
          </Stack>
          <img
            src={ProjectPlaceholder.src}
            style={{
              position: 'absolute',
              bottom: '-8rem',
              left: 'auto',
              right: '12.5rem',
              width: '25rem',
              height: '25rem',
            }}
          />
        </Box>

        <Stack
          spacing="1rem"
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
            paddingLeft: '12.5rem',
            paddingTop: '1.5rem',
          }}
        >
          <Stack direction="row" alignItems="center" spacing="1.5rem">
            <Typography variant="labelLarge">Project Status:</Typography>
            <StateButton state="active" />
          </Stack>
          <Typography variant="labelLarge">
            Expected Timeline: Ongoing
          </Typography>
        </Stack>
      </>
    )
  }

  return (
    <>
      {extraSmallScreen ? <MobileHeader /> : <DesktopHeader />}

      <Box
        sx={{
          backgroundColor: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
        }}
      >
        <Section sx={{ paddingTop: '10rem' }}>
          <Subheader variant="headlineMedium">Problem</Subheader>
          <Typography variant="bodyLarge">
            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </Typography>
        </Section>

        <Section>
          <Subheader variant="headlineMedium">Solution</Subheader>
          <Typography variant="bodyLarge">
            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </Typography>
        </Section>

        <Section>
          <Subheader variant="headlineMedium">Impact</Subheader>
          <Typography variant="bodyLarge">
            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </Typography>
        </Section>

        <Section>
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Current Team
          </Subheader>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(4, 1fr)' },
              gap: '2rem',
            }}
          >
            <CardWithPhoto
              title="Jeffrey"
              description="Program Manager"
              image={Placeholder.src}
            />
            <CardWithPhoto
              title="Jeffrey"
              description="Program Manager"
              image={Placeholder.src}
            />
            <CardWithPhoto
              title="Jeffrey"
              description="Program Manager"
              image={Placeholder.src}
            />
            <CardWithPhoto
              title="Jeffrey"
              description="Program Manager"
              image={Placeholder.src}
            />
          </Box>
        </Section>

        <Section>
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Roles Needed
          </Subheader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: '2rem',
            }}
          >
            <ListItemWithIcon
              listIcon={<DataObjectIcon />}
              listText="UX Designer"
            />
            <ListItemWithIcon
              listIcon={<DataObjectIcon />}
              listText="Marketing Director"
            />
            <ListItemWithIcon
              listIcon={<DataObjectIcon />}
              listText="Backend Engineer"
            />
          </Box>
        </Section>

        <Stack
          sx={{
            alignItems: 'center',
            padding: '4rem 1rem',
          }}
        >
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Questions about this project?
          </Subheader>
          <Button variant="outlined">Contact us</Button>
        </Stack>

        <Stack
          sx={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '4rem 1rem',
          }}
        >
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Interested in volunteering with Open Seattle?
          </Subheader>
          <Button variant="contained">Apply to volunteer</Button>
        </Stack>
      </Box>
    </>
  )
}

export default withBasicLayout(ProjectIndividualPage)
