import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import { useState } from 'react'

import FilterDropdown from './FilterDropdown'

const FilterContainer = () => {
  const [roleSelection, setRoleSelection] = useState<string | undefined>(undefined)
  const [programSelection, setProgramSelection] = useState<string | undefined>(undefined)

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRoleSelection(event.target.value)
  }

  const handleProgramChange = (event: SelectChangeEvent) => {
    setProgramSelection(event.target.value)
  }

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: '1rem', md: '2rem' }}>
      <FilterDropdown
        name="Role Needed"
        options={['Design', 'Engineering', 'Project Management']}
        currentValue={roleSelection}
        handleChange={handleRoleChange}
      />
      <FilterDropdown
        name="Program Area"
        options={['Civic equity', 'Environment', 'Animals', 'LGBTQIA+']}
        currentValue={programSelection}
        handleChange={handleProgramChange}
      />
    </Stack>
  )
}

export default FilterContainer
