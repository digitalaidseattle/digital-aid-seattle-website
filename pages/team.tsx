/*
 * @2024 Digital Aid Seattle
 */
import { useContext, useEffect, useState } from 'react'

import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material'

import CardWithPhoto from 'components/cards/CardWithPhoto'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import {
  ProjectFooterSection,
  ProjectHeaderSection,
  ProjectSection,
  ProjectSubheader,
} from 'components/ProjectComponents'
import { useVolunteers } from 'components/useVolunteers'
import { boardMembers } from 'data/boardMembers'
import { pageCopyService } from 'services/PageCopyService'
import { designColor } from 'theme/theme'
import { DASProject, Volunteer } from 'types'
import NoPhotoPerson from '../assets/no-photo-person.svg'
import ProjectImage from '../assets/project-image.png'

const LABELS = {
  HERO_LBL: 'The Team',
  BOARD_LBL: 'Board of Directors',
  CADRE_LBL: 'Cadre',
  CONTRIBUTORS_LBL: 'Contributors',
}

const DIRECTOR = 'director'
const CEO = 'ceo'

type MemberItem = {
  name: string
  role?: string
  image?: string
  linkedInUrl?: string
}

const norm = (name: string) => name.trim().toLowerCase()

function sortByFirstName<T extends { name: string }>(arr: T[]): T[] {
  return [...arr].sort((a, b) =>
    a.name.trim().localeCompare(b.name.trim(), undefined, { sensitivity: 'base' })
  )
}

const MemberGridSection = (props: {
  title: string
  members: MemberItem[]
  linkedInPlacement: 'below' | 'inline'
}) => {
  return (
    props.members.length > 0 && (
      <ProjectSection>
        <ProjectSubheader
          variant="headlineMedium"
          sx={{ textAlign: 'center', marginBottom: { lg: '5rem' } }}
          component="h2"
        >
          {props.title}
        </ProjectSubheader>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12.25rem, 1fr))',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
          component="ul"
        >
          {props.members.map((member, idx) => (
            // Card stacks title -> subtitle -> description; we show name -> role.
            <Box component="li" key={idx} sx={{ listStyle: 'none' }}>
              <CardWithPhoto
                title={member.name}
                description=""
                subtitle={member.role}
                subtitleSx={{ fontWeight: 500, fontSize: '14px' }}
                image={member.image}
                fallbackImage={NoPhotoPerson.src}
                alt={`headshot of ${member.name}`}
                linkedInUrl={member.linkedInUrl}
                linkedInPlacement={props.linkedInPlacement}
              />
            </Box>
          ))}
        </Box>
      </ProjectSection>
    )
  )
}

const VariantToggle = (props: {
  variant: 'A' | 'B'
  onChange: (variant: 'A' | 'B') => void
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 1200,
        backgroundColor: 'background.paper',
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '2px solid #EAF1F1',
      }}
    >
      <Typography
        variant="labelSmall"
        sx={{ display: 'block', textAlign: 'center', marginBottom: '0.25rem' }}
      >
        LinkedIn icon
      </Typography>
      <ToggleButtonGroup
        value={props.variant}
        exclusive
        onChange={(_, value) => value !== null && props.onChange(value)}
        aria-label="LinkedIn icon placement variant"
        sx={{
          '& .MuiToggleButton-root': {
            color: 'text.primary',
            '&.Mui-selected': {
              backgroundColor: designColor.green.main,
              color: designColor.white,
              '&:hover': {
                backgroundColor: designColor.green.main,
              },
            },
          },
        }}
      >
        <ToggleButton value="A" aria-label="Variant A: LinkedIn icon below name">
          A
          <Typography variant="labelSmall" component="span" color="inherit" sx={{ marginLeft: '0.25rem' }}>
            below
          </Typography>
        </ToggleButton>
        <ToggleButton value="B" aria-label="Variant B: LinkedIn icon inline with name">
          B
          <Typography variant="labelSmall" component="span" color="inherit" sx={{ marginLeft: '0.25rem' }}>
            beside
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

const TeamPage = () => {
  const theme = useTheme()
  const { data: volunteers, loading: volunteersLoading } = useVolunteers()
  const { setLoading } = useContext(LoadingContext)

  const [project, setProject] = useState<DASProject>()
  const [initialized, setInitialized] = useState<boolean>(false)
  const [board, setBoard] = useState<Volunteer[]>([])
  const [cadre, setCadre] = useState<Volunteer[]>([])
  const [contributors, setContributors] = useState<Volunteer[]>([])
  const [variant, setVariant] = useState<'A' | 'B'>('A')

  useEffect(() => {
    if (!initialized) {
      pageCopyService.updateCopy(LABELS, 'team').then(() => {
        setProject({
          imageSrc: ProjectImage.src,
          title: LABELS.HERO_LBL,
        } as DASProject)
        setInitialized(true)
      })
    }
  }, [initialized])

  useEffect(() => {
    if (volunteers) {
      const boardNames = new Set(boardMembers.map((m) => norm(m.name)))
      const isBoardMember = (v: Volunteer) =>
        v.cadreContributor.some((c) => norm(c) === DIRECTOR) ||
        boardNames.has(norm(v.name))
      const boardVols = volunteers.filter(isBoardMember)
      const boardSet = new Set(boardVols.map((v) => norm(v.name)))
      const cadreVols = volunteers.filter(
        (v) =>
          v.status === 'Active' &&
          v.cadreContributor.includes('Cadre') &&
          !boardSet.has(norm(v.name))
      )
      const cadreNames = new Set(cadreVols.map((v) => norm(v.name)))
      const contributorVols = volunteers.filter(
        (v) =>
          v.status === 'Active' &&
          v.cadreContributor.includes('Contributor') &&
          !boardSet.has(norm(v.name)) &&
          !cadreNames.has(norm(v.name))
      )
      const isCeo = (v: Volunteer) => (v.role || '').toLowerCase().includes(CEO)
      const sortedBoard = [...boardVols].sort((a, b) => {
        const aCeo = isCeo(a)
        const bCeo = isCeo(b)
        if (aCeo !== bCeo) return aCeo ? -1 : 1
        return a.name.trim().localeCompare(b.name.trim(), undefined, { sensitivity: 'base' })
      })
      setBoard(sortedBoard)
      setCadre(sortByFirstName(cadreVols))
      setContributors(sortByFirstName(contributorVols))
    }
  }, [volunteers])

  useEffect(() => {
    setLoading(volunteersLoading)
  }, [volunteersLoading, setLoading])

  const toMemberItem = (v: Volunteer): MemberItem => ({
    name: v.name,
    role: v.role,
    image: v.url,
    linkedInUrl: v.linkedIn || undefined,
  })

  function getBody() {
    const linkedInPlacement = variant === 'A' ? 'below' : 'inline'
    return (
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack gap={{ xs: '64px', lg: '80px' }} maxWidth="880px" margin="0 auto">
          <MemberGridSection
            title={LABELS.BOARD_LBL}
            members={board.map(toMemberItem)}
            linkedInPlacement={linkedInPlacement}
          />
          <MemberGridSection
            title={LABELS.CADRE_LBL}
            members={cadre.map(toMemberItem)}
            linkedInPlacement={linkedInPlacement}
          />
          <MemberGridSection
            title={LABELS.CONTRIBUTORS_LBL}
            members={contributors.map(toMemberItem)}
            linkedInPlacement={linkedInPlacement}
          />
        </Stack>
      </SectionContainer>
    )
  }

  return (
    <BlockComponent block={!project}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <ProjectHeaderSection
          project={project}
          hideStatus={true}
          hideBreadcrumbs={true}
        />
        {project ? getBody() : <></>}
        <ProjectFooterSection />
        <VariantToggle variant={variant} onChange={setVariant} />
      </Box>
    </BlockComponent>
  )
}

export default withBasicLayout(TeamPage)
