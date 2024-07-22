/**
* RolesNeededSection.tsx
* example: 
 
<RolesSection title="Active volunteer openings"
 roles={[]}
 showLink={true}
 columns={2} >
          <Typography variant="bodyLarge" marginTop={'2rem'} textAlign={'center'}>All of our volunteers are vetted for experience, and sign a volunteer agreement before commencing work with Digital Aid Seattle.</Typography>
  </RolesSection>

* @2023 Digital Aid Seattle
*/

// icons for role cards
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined'
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { Box, Chip, Link, Stack, Typography } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { theme } from 'theme/theme'
import { DASVolunteerRoleBasicInfo } from 'types'

import ListItemWithIcon from './list/ListItemWithIcon'
import { Section, Subheader } from './style-utils'
import { Check } from '@mui/icons-material'

// TODO: standardize roles between sanity and airtable
const rolesMap = {
  "account-manager": { role: 'account manager', icon: <AccountTreeOutlinedIcon />, },
  "accountant": { role: 'accountant', icon: <CalculateOutlinedIcon />, },
  "administrative-manager": { role: 'administrative manager', icon: <ManageAccountsOutlinedIcon />, },
  "bookkeeper": { role: 'bookkeeper', icon: <CalculateOutlinedIcon />, },
  "business-analyst": { role: 'business analyst', icon: <InsightsOutlinedIcon />, },
  "community-engagement-liaison": { role: 'community engagement liaison', icon: <CampaignOutlinedIcon />, },
  "data-analyst": { role: 'data analyst', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "digital-marketing-specialist-and-ga4-specialist": { role: 'digital marketing specialist & ga4 specialist', icon: <InsightsOutlinedIcon />, },
  "engineering-manager": { role: 'engineering manager', icon: <IntegrationInstructionsOutlinedIcon />, },
  "executive-assistant": { role: 'executive assistant', icon: <ChecklistOutlinedIcon />, },
  "grant-project-manager": { role: 'grant project manager', icon: <DescriptionOutlinedIcon />, },
  "grant-researcher": { role: 'grant researcher', icon: <DescriptionOutlinedIcon />, },
  "grant-writer": { role: 'grant writer', icon: <DescriptionOutlinedIcon />, },
  "graphic-designer": { role: 'graphic designer', icon: <DrawOutlinedIcon />, },
  "hr-generalist": { role: 'hr generalist', icon: <Diversity3OutlinedIcon />, },
  "information-architect": { role: 'information architect', icon: <ApartmentOutlinedIcon />, },
  "it-generalist": { role: 'it generalist', icon: <HubOutlinedIcon />, },
  "marketing-generalist": { role: 'marketing generalist', icon: <AutoStoriesOutlinedIcon />, },
  "operations-manager": { role: 'operations manager', icon: <ManageAccountsOutlinedIcon />, },
  "product-manager": { role: 'product manager', icon: <Diversity3OutlinedIcon />, },
  "project-manager": { role: 'project manager', icon: <ManageAccountsOutlinedIcon />, },
  "public-relations-lead": { role: 'public relations lead', icon: <AutoStoriesOutlinedIcon />, },
  "qa-test-engineer": { role: 'QA/test engineer', icon: <BugReportOutlinedIcon /> },
  "researcher": { role: 'researcher', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "social-media-designer": { role: 'social media designer', icon: <ShareOutlinedIcon />, },
  "social-media-specialist": { role: 'social media specialist', icon: <EmojiPeopleOutlinedIcon />, },
  "software-developer": { role: 'software developer', icon: <CodeOutlinedIcon />, },
  "software-developer-back-end": { role: 'software developer back end', icon: <CodeOutlinedIcon />, },
  "software-developer-front-end": { role: 'software developer front end', icon: <CodeOutlinedIcon />, },
  "solution-architect": { role: 'solution architect', icon: <ApartmentOutlinedIcon />, },
  "storyteller-and-content-writer": { role: 'storyteller & content writer', icon: <AutoStoriesOutlinedIcon />, },
  "user-experience-researcher": { role: 'user experience researcher', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "ux-ui-designer": { role: 'UX/UI designer', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "volunteer": { role: 'volunteer', icon: <EmojiPeopleOutlinedIcon />, },
  "default": { icon: <PeopleOutlineOutlinedIcon /> }
}

type RolesSectionProps = {
  title: string
  columns?: number
  showLink?: boolean
  showFilters?: boolean
  roles?: DASVolunteerRoleBasicInfo[]
  children?: ReactNode
}

const getRoleUrl = (roleKey: string) => {
  return `/volunteer/${roleKey}`
  return `/volunteer/${roleKey}`
}

const RoleListing = ({
  index,
  role,
  showLink,
}: {
  index: number
  role: any
  showLink?: boolean
}) => {
  const RoleBase = (
    {
      sxProps
    }: {
      sxProps?: any
    }
  ) => {
    return (
      <ListItemWithIcon
        key={`${index}-${role?.key}` || `${index}-${role}`}
        listIcon={
          rolesMap[role.key]?.icon ||
          rolesMap[role]?.icon ||
          rolesMap['default'].icon
        }
        listText={role.role || rolesMap[role].role || null}
        sxProps={{
          alignItems: showLink ? 'flex-start' : 'center',
          ...sxProps,
        }}
      />
    )
  }
  return showLink ? (
    <Link href={`${getRoleUrl(role.key)}`} sx={{ textDecoration: 'none' }}>
      <RoleBase
        sxProps={{
          '&': {
            '&:hover': {
              background: 'linear-gradient(0deg, rgba(184, 233, 122, 0.32), rgba(184, 233, 122, 0.32))',
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow:
                '0px 8px 8px 2px rgba(52, 61, 62, 0.1), 0px 8px 4px rgba(52, 61, 62, 0.1)',
            },
          },
        }}
      />
    </Link>
  ) : (
    <RoleBase />
  )
}

const RoleContainer = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'columns',
        gridTemplateColumns: { xs: 'repeat(1), minmax(15rem, 1fr)', md: `repeat(2, minmax(15rem, 1fr))`, lg: 'repeat(3, minmax(15rem, 1fr))' },
        justifyContent: 'center',
        gap: { xs: '1rem', md: '2rem' },
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}

const FilterableRoles = ({ roles, showLink }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [rolesToDisplay, setRolesToDisplay] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setRolesToDisplay([...roles]);
    // using a set to build a list of categories that occur in roles data
    const uniqueCategories = new Set()
    roles.forEach(r => r.category && r.category.forEach(c => uniqueCategories.add(c)))
    setCategories(Array.from(uniqueCategories))
  }, [roles]);

  function filterRolesByCategory(selectedCategory) {
    // if a category is already active (the chip is checked)
    if (activeFilters.includes(selectedCategory)) {
      // remove the category from the list of active filters
      let updatedFilters = activeFilters.filter(f => f !== selectedCategory)

      // filter the roles to include only the ones in the new list of active filters
      setRolesToDisplay(rolesToDisplay.filter(r => r.category && r.category.some(c => updatedFilters.includes(c))))
      setActiveFilters(updatedFilters)

    } else { // the chip was unchecked at time of clicking on it
      // filter the roles to include only the roles that match the selected category,
      // and does not already have a category in the list of active filters (to prevent duplicates)
      let filteredRoles = roles.filter((r) => r.category && r.category.includes(selectedCategory) && !r.category.some(c => activeFilters.includes(c)))

      // add selected category to list of filters
      setActiveFilters([...activeFilters, selectedCategory])

      // if the active filters state is empty at the moment (first filter to be applied)
      if (activeFilters.length === 0) {
        setRolesToDisplay(filteredRoles);
      } else { // if there is at least one filter active at the moment, append to the state.
        setRolesToDisplay(rolesToDisplay.concat(filteredRoles))
      }
    }
  }

  return (
    <>
      <Stack direction="row" gap="1.5rem" marginBottom="3rem" sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((category) => <Chip key={category} label={category} variant={activeFilters.includes(category) ? "filled" : "outlined"} icon={activeFilters.includes(category) && <Check />} onClick={() => filterRolesByCategory(category)} />)}
      </Stack>
      <RoleContainer>
        {activeFilters.length ? rolesToDisplay.map((singleRole, i) => (
          <RoleListing
            key={i}
            index={i}
            role={singleRole}
            showLink={showLink} />
        ))
          : roles.map((singleRole, i) => (
            <RoleListing
              key={i}
              index={i}
              role={singleRole}
              showLink={showLink} />
          ))
        }
      </RoleContainer>
    </>
  )
}

const RolesOnly = ({ roles, showLink }) => {
  return (
    <RoleContainer>
      {roles.map((singleRole, i) => (
        <RoleListing
          key={i}
          index={i}
          role={singleRole}
          showLink={showLink} />
      ))
      }
    </RoleContainer>
  )
}

const RolesSection = ({ title, showLink = false, roles = [], showFilters = false, children }: RolesSectionProps) => {
  return (
    roles.length > 0 && (
      <Section>
        <Subheader variant="headlineMedium">{title}</Subheader>
        {showFilters
          ? <FilterableRoles roles={roles} showLink={showLink} />
          : <RolesOnly roles={roles} showLink={showLink} />
        }
        {children}
      </Section>
    )
  )
}

export default RolesSection
