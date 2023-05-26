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
        gap: {xs: '1rem', lg: '2rem'},
        // probably move these margin styles to the parent container?
        margin: {xs: '0 1rem', lg: '0 200px'},
      }}
    >
      {children}
    </Box>
  )
}

export default CardGridContainer
