import { NavigateNextSharp } from '@mui/icons-material'
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import Masthead from 'components/Masthead'
import { useContext, useEffect, useState } from 'react'
import { DASVolunteerRole } from 'types'

import { dasVolunteerRoleService } from './api/VolunteerRoleService'
import Markdown from 'react-markdown'

const Labels = {
  Title: "Volunteer Opening",
  Home: 'Home',
  Volunteers: 'Volunteers',
  Return: "Return to Volunteer Page",
  PreferredQualificationsPreamble: "If you don't meet every qualification but have some of these skills, please consider applying. Our collaborative team often complements individual expertise to bridge gaps.",
  ApplyToVolunteer: "Apply to Volunteer",
  NotAvailable: "Sorry, this volunteer role is not available.",
  Location: "Location: ",
  Duration: "Duration: ",
  AboutUs: "About Us",
  WhyJoinUs: "Why Join Us?",
  WhatYouWillDo: "What You Will Do",
  Responsibilities: "Responsibilities of ",
  PreferredQualifications: "Preferred Qualifications",
  KeyAttributesToSuccess: "Key Attributes to Success",
  KeyTechnologies: "Key Technologies"
}

const VolunteerRolePage = () => {
  const [role, setRole] = useState<DASVolunteerRole>()
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search)
    dasVolunteerRoleService
      .getRoleDetailsByName(params.get('role'))
      .then((role) => {
        // should reroute if no data
        setRole(role)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [setLoading])

  const theme = useTheme()

  const BreadCrumbSection = ({ roleName }) => {
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextSharp fontSize="small" color={'primary'} />}
      >
        <Link href={'./'} color="primary" underline="hover">
          {Labels.Home}
        </Link>
        <Link href={'./volunteers'} color="primary" underline="hover">
          {Labels.Volunteers}
        </Link>
        <Typography color="textPrimary">{roleName}</Typography>
      </Breadcrumbs>
    )
  }

  const RoleDescriptionSubSection = ({ title, content, prefix = null }) => {
    return (content &&
      <>
        <Box sx={{ typography: 'bodyLarge', fontWeight: 'bold' }}>
          {title}
        </Box>
        {prefix}
        <Markdown className='markdown'>
          {content}
        </Markdown>
      </>)
  }

  const PreferredRoleDescriptionSubSection = ({ title, content }) => {
    return <RoleDescriptionSubSection
      title={title}
      content={content}
      prefix={
        <Typography
          variant="bodyLarge"
          sx={{ display: 'block', fontStyle: 'italic' }}
        >
          {Labels.PreferredQualificationsPreamble}
        </Typography>
      } />
  }

  const RoleDescriptionSection = ({ roleData }) => {
    return (
      <>
        <Typography variant="headlineLarge" sx={{ mt: '2rem' }}>
          {roleData.role}
        </Typography>
        {roleData.headline ? (
          <Box sx={{ typography: 'bodyLarge', fontWeight: 'bold' }}>
            {roleData.headline}
          </Box>
        ) : null}
        <>
          {roleData.location ? (
            <Box
              sx={{
                typography: 'bodyLarge',
                fontWeight: 'bold',
                lineHeight: '0.5rem',
                mt: '1rem',
              }}
            >
              {Labels.Location}
              <span style={{ fontWeight: 'normal' }}>{roleData.location}</span>
            </Box>
          ) : null}
          {roleData.duration ? (
            <Box
              sx={{
                typography: 'bodyLarge',
                fontWeight: 'bold',
                lineHeight: '0.5rem',
                mb: '1rem',
              }}
            >
              {Labels.Duration}
              <span style={{ fontWeight: 'normal' }}>{roleData.duration}</span>
            </Box>
          ) : null}
        </>
        <RoleDescriptionSubSection
          title={Labels.AboutUs}
          content={roleData.aboutUs}
        />
        <RoleDescriptionSubSection
          title={Labels.WhyJoinUs}
          content={roleData.whyJoin}
        />
        <RoleDescriptionSubSection
          title={Labels.WhatYouWillDo}
          content={roleData.whatYouWillDo}
        />
        <RoleDescriptionSubSection
          title={Labels.Responsibilities + roleData.role}
          content={roleData.responsibilities}
        />
        <PreferredRoleDescriptionSubSection
          title={Labels.PreferredQualifications}
          content={roleData.preferredQualifications}
        />
        <RoleDescriptionSubSection
          title={Labels.KeyAttributesToSuccess}
          content={roleData.keyAttributesToSuccess}
        />
        <RoleDescriptionSubSection
          title={Labels.KeyTechnologies}
          content={roleData.keyTechnologies}
        />
        {roleData.applicationLink ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: '2rem',
            }}
          >
            <Link href={roleData.applicationLink} target="_blank">
              <Button variant="contained">{Labels.ApplyToVolunteer}</Button>
            </Link>
          </Box>
        ) : null}
      </>
    )
  }

  const RoleUnavailableSection = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="headlineLarge" sx={{ mt: '2rem', mb: '2rem' }}>
          {Labels.NotAvailable}
        </Typography>
        <Link href={'./volunteers'}>
          <Button variant="contained">{Labels.Return}</Button>
        </Link>
      </Box>
    )
  }

  return (
    <>
      <Masthead title={Labels.Title} />
      <BlockComponent block={!role}>
        <SectionContainer backgroundColor={theme.palette.background.default}>
          <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth={'880px'}>
            {role && (
              <>
                <BreadCrumbSection roleName={String(role.role)} />
                <RoleDescriptionSection roleData={role} />
              </>
            )}
            {!role && <RoleUnavailableSection />}
          </Stack>
        </SectionContainer>
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(VolunteerRolePage)
