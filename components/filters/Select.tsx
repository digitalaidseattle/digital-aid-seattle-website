import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FilterDropdown = () => {
    const [role, setRole] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setRole(event.target.value as string);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-role-label">Age</InputLabel>
          <Select
            labelId="select-role-label"
            id="select-role-label"
            value={role}
            label="Role Needed"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}


export default FilterDropdown;