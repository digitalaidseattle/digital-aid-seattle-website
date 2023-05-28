import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const CardRowContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        // padding: '80px 200px 120px 200px', // for testing only
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // backgroundColor: '#F2F7F7' // for testing
      }}
    >
      {children}
    </Box>
  )
}

export default CardRowContainer
