import { useEffect, useState } from 'react'
import { DASVolunteerRole } from 'types'
import { dasVolunteerRoleService } from './api/VolunteerRoleService'
import { withBasicLayout } from 'components/layouts'
import { Button } from '@mui/material'
import Link from 'next/link'

import { Box, useTheme } from '@mui/material'

const VolunteerRolePage = () => {
  const [role, setRole] = useState<DASVolunteerRole>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    dasVolunteerRoleService
      .getVolunteerRoleByName(params.get('role'))
      .then((role) => setRole(role))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Loading!</h1>
        </Box>
      )}
      {role ? (
        <>
        {/* Fix: format to match figma file: https://www.figma.com/file/vs1l6ERmi4AqYjxBBK9gDJ/Style-Guide-%26-Prototypes?type=design&node-id=2404-32837&mode=design&t=YHOYNerJdHcOVOLq-0 */}
        {/* Blocker: waiting for Seamus to update airtable fields for better formatting - volunteerRoleService.ts will need to be updated to accommodate updated fields */}
          <h1>{role.role}</h1>
          <p>{role.description}</p>
          <Link href={'./volunteers'}>
            <Button>Return to Volunteer Page</Button>
          </Link>
        </>
      ) : (
        <p>Role not found</p>
      )}
    </>
  )
}

export default withBasicLayout(VolunteerRolePage)
