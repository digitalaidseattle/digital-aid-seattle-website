import { ReactNode } from 'react'
import Stack from '@mui/material/Stack';

type Props = {
    children: ReactNode
  }

const FilterContainer = ({ children }: Props) => {
  
    return (
      <Stack direction="row" spacing={{xs: "1rem", md: "2rem"}}>
        {children}
      </Stack>
    );
}


export default FilterContainer;