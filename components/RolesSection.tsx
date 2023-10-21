/**
* RolesNeededSection.tsx
* example: 
 
<RolesSection title="Current volunteer openings"
 roles={[]}
 showLink={true}
 columns={2} >
          <Typography variant="bodyLarge" marginTop={'2rem'} textAlign={'center'}>All of our volunteers are vetted for experience, and sign a volunteer agreement before commencing work with Digital Aid Seattle.</Typography>
  </RolesSection>

* @2023 Digital Aid Seattle
*/


import { Box, Button } from '@mui/material'
// icons for role cards
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined'
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { ReactNode } from 'react'
import ListItemWithIcon from './list/ListItemWithIcon'
import { Section, Subheader } from './style-utils'
import { form } from 'sanity/desk'

// TODO: standardize roles between sanity and airtable
const rolesMap = {
  communityEngagementLiason: { role: 'community engagement liaison', icon: <CampaignOutlinedIcon />, },
  dataAnalyst: { role: 'data analyst', icon: <ScreenSearchDesktopOutlinedIcon />, },
  designer: { role: 'designer', icon: <DrawOutlinedIcon />, },
  graphicDesigner: { role: 'graphic designer', icon: <DrawOutlinedIcon />, },
  grantWriter: { role: 'grant writer', icon: <DescriptionOutlinedIcon />, },
  legalHelp: { role: 'legal help', icon: <GavelRoundedIcon />, },
  productManager: { role: 'product manager', icon: <Diversity3OutlinedIcon />, },
  projectManager: { role: 'project manager', icon: <ManageAccountsOutlinedIcon />, },
  uxResearcher: { role: 'user experience researcher', icon: <ScreenSearchDesktopOutlinedIcon />, },
  userExperienceResearcher: { role: 'user experience researcher', icon: <ScreenSearchDesktopOutlinedIcon />, },
  uxUiDesigner: { role: 'UX/UI designer', icon: <ScreenSearchDesktopOutlinedIcon />, },
  socialMediaDesigner: { role: 'social media designer', icon: <ShareOutlinedIcon />, },
  socialMediaSpecialist: { role: 'social media specialist', icon: <EmojiPeopleOutlinedIcon />, },
  softwareEngineer: { role: 'software engineer', icon: <CodeOutlinedIcon />, },
  softwareDeveloper: { role: 'software developer', icon: <CodeOutlinedIcon />, },
  solutionArchitect: { role: 'solution architect', icon: <ApartmentOutlinedIcon />, },
  qaTestEngineer: { role: 'QA/test engineer', icon: <BugReportOutlinedIcon /> },
  storyteller: { role: 'storyteller', icon: <AutoStoriesOutlinedIcon />, },
  qaSpecialist: { role: 'QA specialist', icon: <BugReportOutlinedIcon />, }
}

// TODO: do we want to make an option of allowing for a full role to be passed in, or just the role name?
type RolesSectionProps = {
  title: string
  columns?: number
  showLink?: boolean
  roles?: string[]
  children?: ReactNode
}

// TODO: simplify the conversion of role names to url friendly formats and vice versa
const getRoleUrl = (role:string) => {
 return `/volunteer_role?role=${(role.split(/(?=[A-Z \/])/g).join('-').toLowerCase())}`
}

const RolesSection = ({ title, columns = 3, showLink = false, roles = [], children }: RolesSectionProps) => {
  // TODO: simplify the conversion of role names for use in map lookup
  const formattedRoles = roles.map(role => role.toLowerCase().split(/ |\//).map((word,i)=>{ return (i>0 ?(word[0].toUpperCase() + word.slice(1)) : word)}).join('').replace(/\//g,''))

  return (roles.length > 0) &&
    <Section>
      <Subheader variant="headlineMedium">
        {title}
      </Subheader>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'columns',
          gridTemplateColumns: `repeat(${columns}, minmax(15rem, 1fr))`,
          justifyContent: 'center',
          gap: '2rem',
          width: '100%',
        }}
      >
        {(showLink ? formattedRoles : roles)
          .filter(item => rolesMap[item])
          .map(item =>
            <>
            <ListItemWithIcon
              key={item}
              listIcon={rolesMap[item].icon}
              listText={rolesMap[item].role}
              sxProps={{ alignItems: showLink ? 'flex-start' : 'center' }}
              >
              {showLink &&
                <Button
                variant="outlined"
                href={`${getRoleUrl(item)}`}
                sx={{ width: { md: 'max-content' } }}
                >
                  Learn more &rarr;
                </Button>
              }
            </ListItemWithIcon>
        </>
            )
        }
      </Box>
      {children}
      </Section>
}

export default RolesSection
