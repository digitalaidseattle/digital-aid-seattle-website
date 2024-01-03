import { Box, TextField } from '@mui/material'
import { useState } from 'react'

const EmailFormInput = () => {
  const [email, setEmail] = useState('')

  return (
    <Box
      color="primary"
      sx={{
        backgroundColor: 'white',
        borderRadius: '28px',
        padding: '0 1rem',
        width: { xs: 'auto', lg: '25rem' },
        flex: { xs: '1', lg: 'none' },
      }}
    >
      <TextField
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ width: '100%' }}
      />
    </Box>
  )
}

export default EmailFormInput
