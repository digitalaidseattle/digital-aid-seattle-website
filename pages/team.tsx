/*
 * @2024 Digital Aid Seattle
 */
import { useContext, useEffect, useMemo, useState } from 'react'

import { Box, Stack, useTheme } from '@mui/material'

import CardWithPhoto from 'components/cards/CardWithPhoto'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import {
  ProjectFooterSection,
  ProjectHeaderSection,
  ProjectSection,
  ProjectSubheader,
} from 'components/ProjectComponents'
import { useProjects } from 'components/useProjects'
import { useVolunteers } from 'components/useVolunteers'
import { boardMemberNames } from 'data/boardMembers'
import { pageCopyService } from 'services/PageCopyService'
import { DASProject, Volunteer } from 'types'
import NoPhotoPerson from '../assets/no-photo-person.svg'
import ProjectImage from '../assets/project-image.png'

const LABELS = {
  HERO_LBL: 'The Team',
  BOARD_LBL: 'Board of Directors',
  CADRE_LBL: 'Cadre',
  CONTRIBUTORS_LBL: 'Contributors',
}

type MemberItem = {
  name: string
  role?: string
  image?: string
  subtitle?: string
}

const norm = (name: string) => name.trim().toLowerCase()

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Map of normalized member name -> titles of the active ventures they're on.
function buildVentureMap(projects?: DASProject[]): Map<string, string[]> {
  const map = new Map<string, string[]>()
  ;(projects ?? [])
    .filter((p) => p.status === 'Active')
    .forEach((p) => {
      ;(p.currentTeam ?? []).forEach((m) => {
        const key = norm(m.name)
        if (!key) return
        map.set(key, [...(map.get(key) ?? []), p.title])
      })
    })
  return map
}

const MemberGridSection = (props: { title: string; members: MemberItem[] }) => {
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
            gridAutoFlow: 'columns',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12.25rem, 1fr))',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
          component="ul"
        >
          {props.members.map((member, idx) => (
            <CardWithPhoto
              key={idx}
              title={member.name}
              description={member.role ?? ''}
              subtitle={member.subtitle}
              image={member.image}
              alt={`headshot of ${member.name}`}
            />
          ))}
        </Box>
      </ProjectSection>
    )
  )
}

const TeamPage = () => {
  const theme = useTheme()
  const { data: volunteers, loading: volunteersLoading } = useVolunteers()
  const { data: projects, loading: projectsLoading } = useProjects()
  const { setLoading } = useContext(LoadingContext)

  const [project, setProject] = useState<DASProject>()
  const [initialized, setInitialized] = useState<boolean>(false)
  const [cadre, setCadre] = useState<Volunteer[]>([])
  const [contributors, setContributors] = useState<Volunteer[]>([])

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

  // Split volunteers into Cadre / Contributors with no duplicates
  // (precedence Board > Cadre > Contributors), randomized once per load.
  useEffect(() => {
    if (volunteers) {
      const boardNames = new Set(boardMemberNames.map((name) => norm(name)))
      const cadreVols = volunteers.filter(
        (v) =>
          v.status === 'Active' &&
          v.cadreContributor.includes('Cadre') &&
          !boardNames.has(norm(v.name))
      )
      const cadreNames = new Set(cadreVols.map((v) => norm(v.name)))
      const contributorVols = volunteers.filter(
        (v) =>
          v.status === 'Active' &&
          v.cadreContributor.includes('Contributor') &&
          !boardNames.has(norm(v.name)) &&
          !cadreNames.has(norm(v.name))
      )
      setCadre(shuffle(cadreVols))
      setContributors(shuffle(contributorVols))
    }
  }, [volunteers])

  useEffect(() => {
    setLoading(volunteersLoading || projectsLoading)
  }, [volunteersLoading, projectsLoading, setLoading])

  const ventureByName = useMemo(() => buildVentureMap(projects), [projects])

  // Board members come from the Coda volunteer data, in the order listed above.
  const boardItems: MemberItem[] = boardMemberNames
    .map((name) => (volunteers ?? []).find((v) => norm(v.name) === norm(name)))
    .filter((v): v is Volunteer => !!v)
    .map((v) => ({
      name: v.name,
      role: v.role,
      image: v.url || NoPhotoPerson.src,
    }))

  const toMemberItem = (v: Volunteer): MemberItem => ({
    name: v.name,
    role: v.role,
    image: v.url || NoPhotoPerson.src,
    subtitle: ventureByName.get(norm(v.name))?.join(', '),
  })

  function getBody() {
    return (
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack gap={{ xs: '64px', lg: '80px' }} maxWidth="880px" margin="0 auto">
          <MemberGridSection title={LABELS.BOARD_LBL} members={boardItems} />
          <MemberGridSection
            title={LABELS.CADRE_LBL}
            members={cadre.map(toMemberItem)}
          />
          <MemberGridSection
            title={LABELS.CONTRIBUTORS_LBL}
            members={contributors.map(toMemberItem)}
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
      </Box>
    </BlockComponent>
  )
}

export default withBasicLayout(TeamPage)
