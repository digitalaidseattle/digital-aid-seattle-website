/*
 * @2024 Digital Aid Seattle
 */
import { useContext, useEffect, useState } from 'react'

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
import { useVolunteers } from 'components/useVolunteers'
import { boardMembers } from 'data/boardMembers'
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
  linkedInUrl?: string
}

const norm = (name: string) => name.trim().toLowerCase()

function sortByFirstName<T extends { name: string }>(arr: T[]): T[] {
  return [...arr].sort((a, b) =>
    a.name.trim().localeCompare(b.name.trim(), undefined, { sensitivity: 'base' })
  )
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
                alt={`headshot of ${member.name}`}
                linkedInUrl={member.linkedInUrl}
              />
            </Box>
          ))}
        </Box>
      </ProjectSection>
    )
  )
}

const TeamPage = () => {
  const theme = useTheme()
  const { data: volunteers, loading: volunteersLoading } = useVolunteers()
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
  // (precedence Board > Cadre > Contributors), sorted alphabetically by first name.
  useEffect(() => {
    if (volunteers) {
      const boardNames = new Set(boardMembers.map((m) => norm(m.name)))
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
      setCadre(sortByFirstName(cadreVols))
      setContributors(sortByFirstName(contributorVols))
    }
  }, [volunteers])

  useEffect(() => {
    setLoading(volunteersLoading)
  }, [volunteersLoading, setLoading])

  // Board members come from the Coda volunteer data, in the order listed above.
  const boardItems: MemberItem[] = boardMembers
    .map((bm) => (volunteers ?? []).find((v) => norm(v.name) === norm(bm.name)))
    .filter((v): v is Volunteer => !!v)
    .map((v) => ({
      name: v.name,
      role: v.role,
      image: v.url || NoPhotoPerson.src,
      linkedInUrl: v.linkedIn,
    }))

  const toMemberItem = (v: Volunteer): MemberItem => ({
    name: v.name,
    role: v.role,
    image: v.url || NoPhotoPerson.src,
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
