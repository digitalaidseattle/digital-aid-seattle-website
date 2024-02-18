import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import EmailFormInput from './EmailFormInput'

const EmailFormContainer = () => {
  const theme = useTheme()
  const [email, setEmail] = useState('');
  const [error, setError] = useState('LOL');

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: { xs: 'flex-start', lg: 'center' },
        gap: '2rem',
      }}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'}>
        <Typography
          variant="headlineMedium"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Sign up for our newsletter
        </Typography>
        <Typography
          variant="bodyLarge"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Stay in the know!
        </Typography>
      </Stack>
      <Stack gap='1rem' sx={{width: { xs: '100%', lg: 'auto' }}}>
        <Stack
          gap='2rem'
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <EmailFormInput 
            userEmail={email}
            handleEmailInput={(formInput)=>setEmail(formInput)}
            error={error}
          />
          <Button
            sx={{
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.dark,
            }}
          >
            Sign up
          </Button>
        </Stack>
        {error && <Typography sx={{
          paddingLeft: '1rem',
          color: theme.palette.error.main, 
          }}>Error: {error}</Typography>}
      </Stack>
    </Stack>
  )
}

export default EmailFormContainer
