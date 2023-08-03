import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const CardRowContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'repeat(3, minmax(0, 1fr))',
        },
        gap: '2rem',
      }}
    >
      {children}
    </Box>
  )
}

export default CardRowContainer
