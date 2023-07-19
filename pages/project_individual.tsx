import { Typography, useTheme, Stack, styled, Box, Button } from '@mui/material'
import { withBasicLayout } from 'components/layouts'
import StateBadge from 'components/cards/StateBadge'
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
    [theme.breakpoints.up('xs')]: {
      paddingTop: '4rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: '4rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: '5rem',
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
                <Typography variant="displayLarge">The Cadre</Typography>
                <Typography variant="headlineLarge">Open Seattle</Typography>
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
                  <StateBadge state="active" />
                </Stack>

                <Stack direction="row" alignItems="center" spacing="1.5rem">
                  <Typography variant="labelLarge">
                    Expected Timeline:
                  </Typography>
                  <Typography variant="labelLarge">Ongoing</Typography>
                </Stack>
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
            Nonprofits that try to adopt new tech can&apos;t staff for their
            digital needs. They grapple with efficiency and face operational
            burdens without proper digital tools, leading to funding shortages
            and lost volunteers.
            <br />
            <br />
            77% of nonprofits say that skilled volunteers could majorly impact
            their mission, but only 12% actually utilize them. Most software
            projects will fail, even with financial backing. And—during the
            pandemic, Covid-related drops in volunteer hours nationwide reached
            19%.
            <br />
            <br />
            Washington state needs a more structured tech volunteering model.
          </Typography>
        </Section>

        <Section>
          <Subheader variant="headlineMedium">Solution</Subheader>
          <Typography variant="bodyLarge">
            The state of Washington boasts over 70,000 technologists, more than
            55,000 residing in greater Seattle. Meanwhile, statistics show that
            30% of professionals will volunteer if given the chance. SO, how can
            we utilize this resource?
            <br />
            <br />
            OPEN SEATTLE fosters connections between volunteers and the orgs
            that can utilize their talents and provides nonprofits with digital
            systems and tools that boost their efforts.
          </Typography>
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
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Current Team
          </Subheader>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'min-content auto',
                lg: 'repeat(4, 1fr)',
              },
              alignItems: 'center',
              justifyContent: 'center',
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

        <Section
          sx={{
            alignItems: 'center',
            paddingBottom: { xs: '4rem', lg: '5rem' },
          }}
        >
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Questions about this project?
          </Subheader>
          <Button variant="outlined">Contact us</Button>
        </Section>

        <Section
          sx={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            paddingBottom: { xs: '4rem', lg: '5rem' },
          }}
        >
          <Subheader variant="headlineMedium" sx={{ textAlign: 'center' }}>
            Interested in volunteering with Open Seattle?
          </Subheader>
          <Button variant="contained">Apply to volunteer</Button>
        </Section>
      </Box>
    </>
  )
}

export default withBasicLayout(ProjectIndividualPage)
