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
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <TextField
        value={email}
        placeholder='email address'
        onChange={(e) => setEmail(e.target.value)}
        variant="standard"
        InputProps={{
          disableUnderline: true
        }}
        sx={{ 
          width: '100%', 
          height: 'min-content'
        }}
      />
    </Box>
  )
}

export default EmailFormInput
