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
      }}
    >
      {children}
    </Box>
  )
}

export default CardGridContainer
