import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

type Props = {
  name: string
  options: string[]
}

const FilterDropdown = ({name, options}: Props) => {

    const [selection, setSelection] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setSelection(event.target.value as string);
    };
  
    return (
      <Box sx={{ minWidth: 200 }}>
        <FormControl size="small" sx={{width: '100%'}}>
          <InputLabel id={`select-${name}-label`}>
            <Typography variant="labelLarge" sx={{textTransform: 'capitalize'}}>
              {name === "role" ? "role needed" : name}
            </Typography>
          </InputLabel>
          <Select
            labelId={`select-${name}-label`}
            id={`select-${name}-label`}
            value={selection}
            label={name === "role" ? "role needed" : name}
            onChange={handleChange}>
              {
                options.map(val => <MenuItem value={val}>{val}</MenuItem>)
              }
          </Select>
        </FormControl>
      </Box>
    );
}


export default FilterDropdown;