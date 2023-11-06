import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  columns?: number
}

const CardGridContainer = ({ children, columns = 2 }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: `repeat(${columns}, minmax(0, 1fr))`,
        },
        gap: '2rem',
      }}
      component="ul"
    >
      {children}
    </Box>
  )
}

export default CardGridContainer
