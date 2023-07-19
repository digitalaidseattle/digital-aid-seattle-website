import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const IconContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        borderRadius: '50%',
        width: '5rem',
        height: '5rem',
        padding: '1.2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default IconContainer
