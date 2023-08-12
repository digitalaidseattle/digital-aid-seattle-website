import Box from '@mui/material/Box'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const SearchContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: '#F7FAFA',
        padding: '2rem',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {children}
    </Box>
  )
}

export default SearchContainer
