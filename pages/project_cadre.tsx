import { getTeamMembers } from '../sanity/lib/client'
import { urlForImage } from '../sanity/lib/image'
import { useEffect, useState } from 'react'

import DataObjectIcon from '@mui/icons-material/DataObject'
import {
  Box,
  Button,
  Stack,
  styled,
  Typography,
  useTheme,
  CircularProgress,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import SectionContainer from 'components/layout/SectionContainer'
// imports for placeholders-- delete as needed
import ProjectPlaceholder from 'assets/logo-light-icon.svg'
import StateBadge from 'components/cards/StateBadge'
import { withBasicLayout } from 'components/layouts'
import ListItemWithIcon from 'components/list/ListItemWithIcon'
import CardWithPhoto from 'components/cards/CardWithPhoto'

const ProjectIndividualPage = () => {
  const [teamData, setTeamData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeamMembers()
      .then((fetchedData) => setTeamData(fetchedData))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  const Subheader = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    [theme.breakpoints.up('xs')]: {
      marginBottom: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '2.5rem',
    },
  }))

  const Section = styled(Stack)(({ theme }) => ({
    width: '100%',
    color: theme.palette.primary.main,
  }))

  const TextSection = styled(Stack)(() => ({
    gap: '2rem',
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
            <Typography variant="displayMedium">The Cadre</Typography>
            <Typography variant="headlineMedium">Open Seattle</Typography>
          </Stack>
          <Stack spacing="1rem">
            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">Project Status:</Typography>
              <StateBadge state="active" />
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
            color: theme.palette.primary.contrastText,
            paddingTop: { md: '5.5rem', lg: '14.5rem' },
            paddingBottom: '1rem',
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              margin: '0 auto',
              maxWidth: '880px',
              paddingX: { xs: '1rem', md: '2rem', lg: '0' },
            }}
          >
            <Stack>
              <Typography
                variant={largeScreen ? 'displayLarge' : 'displayMedium'}
                sx={{
                  width: { md: '40vw', lg: '25rem' },
                }}
              >
                The Cadre
              </Typography>
              <Typography
                variant={largeScreen ? 'headlineLarge' : 'headlineMedium'}
              >
                Open Seattle
              </Typography>
            </Stack>

            <Box
              sx={{
                width: { md: 'min(40vw, 18rem)', lg: '25rem' },
                position: 'absolute',
                right: { xs: '1rem', md: '2rem', lg: '0' },
                bottom: '-6rem',
                zIndex: '2',
              }}
            >
              <img
                src={ProjectPlaceholder.src}
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '20px',
                  boxShadow:
                    '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            width: '100%',
            paddingY: '1rem',
          }}
        >
          <Stack
            spacing="1rem"
            width={{ md: 'auto', lg: '880px' }}
            sx={{
              color: theme.palette.primary.main,
              margin: '0 auto',
              paddingLeft: { md: '2rem', lg: '0' },
            }}
          >
            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">Project Status:</Typography>
              <StateBadge state="active" />
            </Stack>

            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">Expected Timeline:</Typography>
              <Typography variant="labelLarge">Ongoing</Typography>
            </Stack>
          </Stack>
        </Box>
      </>
    )
  }

  return (
    <>
      {extraSmallScreen ? <MobileHeader /> : <DesktopHeader />}

      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '64px', lg: '80px' }}
          maxWidth="880px"
          margin="0 auto"
        >
          <Section>
            <Subheader variant="headlineMedium">Problem</Subheader>
            <TextSection>
              <Typography variant="bodyLarge">
                Nonprofits that try to adopt new tech can&apos;t staff for their
                digital needs. They grapple with efficiency and face operational
                burdens without proper digital tools, leading to funding
                shortages and lost volunteers.
              </Typography>

              <Typography variant="bodyLarge">
                77% of nonprofits say that skilled volunteers could majorly
                impact their mission, but only 12% actually utilize them. Most
                software projects will fail, even with financial backing.
                And—during the pandemic, Covid-related drops in volunteer hours
                nationwide reached 19%.
              </Typography>

              <Typography variant="bodyLarge">
                Washington state needs a more structured tech volunteering
                model.
              </Typography>
            </TextSection>
          </Section>

          <Section>
            <Subheader variant="headlineMedium">Solution</Subheader>
            <TextSection>
              <Typography variant="bodyLarge">
                The state of Washington boasts over 70,000 technologists, more
                than 55,000 residing in greater Seattle. Meanwhile, statistics
                show that 30% of professionals will volunteer if given the
                chance. SO, how can we utilize this resource?
              </Typography>
              <Typography variant="bodyLarge">
                OPEN SEATTLE fosters connections between volunteers and the orgs
                that can utilize their talents and provides nonprofits with
                digital systems and tools that boost their efforts.
              </Typography>
            </TextSection>
          </Section>

          <Section>
            <Subheader variant="headlineMedium">Impact</Subheader>
            <Typography variant="bodyLarge">
              Open Seattle helps nonprofits build the structure essential for
              success in any technology project, acting as a force multiplier to
              help organizations create lasting impact.
            </Typography>
          </Section>

          <Section>
            <Subheader
              variant="headlineMedium"
              sx={{ textAlign: 'center', marginBottom: { lg: '5rem' } }}
            >
              Current Team
            </Subheader>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'columns',
                gridTemplateColumns: 'repeat(auto-fill, minmax(12.25rem, 1fr))',
                // alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '2rem',
                width: '100%',
              }}
            >
              {teamData.map((person) => (
                <CardWithPhoto
                  key={person._id}
                  title={person.name}
                  description={person.role}
                  image={urlForImage(person.image).url()}
                />
              ))}
            </Box>
          </Section>

          <Section>
            <Subheader
              variant="headlineMedium"
              sx={{ textAlign: 'center', marginBottom: { lg: '5rem' } }}
            >
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

          <Section
            sx={{
              alignItems: 'center',
            }}
          >
            <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
              Questions about this project?
            </Subheader>
            <Button variant="outlined" href="mailto:info@openseattle.org">
              Contact us
            </Button>
          </Section>
        </Stack>
      </SectionContainer>

      <SectionContainer backgroundColor={theme.palette.primary.contrastText}>
        <Section
          sx={{
            alignItems: 'center',
          }}
        >
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Interested in volunteering with Open Seattle?
          </Subheader>
          <Button variant="contained">Apply to volunteer</Button>
        </Section>
      </SectionContainer>
    </>
  )
}

export default withBasicLayout(ProjectIndividualPage)
