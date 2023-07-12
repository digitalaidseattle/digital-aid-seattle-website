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
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '12.5rem',
      paddingRight: '12.5rem',
    },
  }))

  function MobileHeader() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: '100%',
            height: '28.75rem',
            color: theme.palette.primary.contrastText,
            position: 'absolute',
            zIndex: '0',
          }}
        ></Box>
        <Stack
          spacing="2rem"
          sx={{
            position: 'relative',
            padding: '4rem 1rem 0rem 1rem',
          }}
        >
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

          <img
            src={ProjectPlaceholder.src}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              display: 'block',
              borderRadius: '20px',
              boxShadow:
                '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
            }}
          />
        </Stack>
      </>
    )
  }

  function DesktopHeader() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: '25rem',
            color: theme.palette.primary.contrastText,
            position: 'absolute',
            width: '100%',
          }}
        ></Box>

        <Box
          sx={{
            position: 'relative',
            margin: { sm: '0 2rem', lg: '0 12.5rem' },
            paddingTop: '6rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: '2rem',
              justifyContent: 'space-between',
              width: '100%',
              minHeight: '25rem',
            }}
          >
            <Stack spacing="3rem">
              <Stack>
                <Typography variant="displayMedium">Project Title</Typography>
                <Typography variant="headlineMedium">Partner Name</Typography>
              </Stack>

              <Stack
                spacing="1rem"
                sx={{
                  backgroundColor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.main,
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
            </Stack>

            <img
              src={ProjectPlaceholder.src}
              style={{
                width: '25rem',
                display: 'block',
                borderRadius: '20px',
                boxShadow:
                  '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
              }}
            />
          </Box>
        </Box>
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
        <Section>
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
