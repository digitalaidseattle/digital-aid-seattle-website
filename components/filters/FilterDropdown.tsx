import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import * as React from 'react'

type Props = {
  name: string
  options: string[]
  currentValue: string | undefined
  handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void
}

const FilterDropdown = ({
  name,
  options,
  currentValue,
  handleChange,
}: Props) => {
  return (
    <Box sx={{ width: { xs: '100%', md: 200 } }}>
      <FormControl size="small" sx={{ width: '100%' }}>
        <InputLabel id={`select-${name}-label`}>
          <Typography variant="labelLarge" sx={{ textTransform: 'capitalize' }}>
            {name}
          </Typography>
        </InputLabel>
        <Select
          labelId={`select-${name}-label`}
          id={`select-${name}-label`}
          value={currentValue}
          label={name}
          onChange={handleChange}
        >
          {options.map((val) => (
            <MenuItem key={val} value={val}>{val}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default FilterDropdown
