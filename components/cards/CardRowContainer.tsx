import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const CardRowContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default CardRowContainer
