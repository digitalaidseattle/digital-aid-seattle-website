import { ReactNode } from 'react'
import Stack from '@mui/material/Stack';
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import FilterDropdown from './FilterDropdown'


const FilterContainer = () => {
  const [roleSelection, setRoleSelection] = useState(undefined);
  const [programSelection, setProgramSelection] = useState(undefined);

  const handleRoleChange = (event: SelectChangeEvent) => {
      setRoleSelection(event.target.value as string);
  };

  const handleProgramChange = (event: SelectChangeEvent) => {
      setProgramSelection(event.target.value as string);
  };
  
    return (
      <Stack direction="row" spacing={{xs: "1rem", md: "2rem"}}>
            <FilterDropdown 
              name="Role Needed" 
              options={["Design", "Engineering", "Project Management"]}
              currentValue={roleSelection} 
              handleChange={handleRoleChange} 
            />
            <FilterDropdown 
              name="Program Area" 
              options={["Civic equity", "Environment", "Animals", "LGBTQIA+"]}
              currentValue={programSelection} 
              handleChange={handleProgramChange} 
            />
      </Stack>
    );
}


export default FilterContainer;