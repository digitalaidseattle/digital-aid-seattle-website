import { ReactNode } from 'react'
import Box from '@mui/material/Box';

type Props = {
    children: ReactNode
  }

const FilterContainer = ({ children }: Props) => {
  
    return (
      <Box sx={{ backgroundColor: '#F7FAFA', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        {children}
      </Box>
    );
}


export default FilterContainer;