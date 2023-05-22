import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const CardGridContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {xs: '1fr', sm: 'repeat(2, 1fr)'},
        gap: '2rem',
        // probably move these margin styles to the overall container?
        ml: {xs: '0', sm: '50px', lg: '200px'},
        mr: {xs: '0', sm: '50px',  lg: '200px'}
      }}
    >
      {children}
    </Box>
  )
}

export default CardGridContainer
