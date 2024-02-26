import { Box, TextField, useTheme } from '@mui/material'

const EmailFormInput = ({ userEmail, handleEmailInput, error }) => {
  const theme = useTheme()

  return (
    <Box
      color="primary"
      sx={{
        backgroundColor: 'white',
        borderRadius: '28px',
        border: error ? `3px solid ${theme.palette.error.main}` : 'none',
        padding: '0.25rem 1rem',
        width: { xs: 'auto', lg: '25rem' },
        flex: { xs: '1', lg: 'none' },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <TextField
        value={userEmail}
        placeholder='email address'
        onChange={(e) => handleEmailInput(e.target.value)}
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
