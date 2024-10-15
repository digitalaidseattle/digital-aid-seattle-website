import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import EmailFormInput from './EmailFormInput'

const EmailFormContainer = () => {
  const theme = useTheme()
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(isValidEmail)) {
      setError('')
      // TODO: submit email to newsletter service
    } else {
      setError('Not a valid email address.')
    }
  }

  const LabelSection = () => {
    return (
      <Stack direction={'column'}
        sx={{
          width: { xs: '100%' }
        }}
      >
        <Typography
          variant="headlineMedium"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Stay Connected!
        </Typography>
        <Typography
          variant="bodyLarge"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Sign up for our newsletter
        </Typography>
      </Stack>
    )
  }



  const InputSection = () => {
    return (
      <Stack
        sx={{
          width: { xs: '100%', lg: 'auto' },
          flexDirection: { xs: 'column', md: 'row', lg: 'row' },
        }}>
        <Stack>
          <Stack gap='1rem'
            sx={{
              width: { xs: '100%', lg: 'auto' },
              flexDirection: { xs: 'column', md: 'row' },
            }}>
            <EmailFormInput
              userEmail={email}
              handleEmailInput={(formInput) => setEmail(formInput)}
              error={error}
            />
            {error &&
              <Typography
                sx={{
                  display: { xs: 'flex', md: 'none', lg: 'none' },
                  paddingLeft: '1rem',
                  color: theme.palette.error.main,
                }}>Error: {error}</Typography>
            }
            <Button
              variant="contained"
              sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.dark,
              }}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </Stack>
          {error &&
            <Typography
              sx={{
                display: { xs: 'none', md: 'flex', lg: 'flex' },
                paddingLeft: '1rem',
                color: theme.palette.error.main,
              }}>Error: {error}</Typography>
          }
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack
      sx={{
        width: { xs: '80%', lg: 'auto' },
        paddingTop: { md: '5rem', lg: '5rem' },
        flexDirection: { xs: 'column', md: 'column', lg: 'row' },
        alignItems: { xs: 'flex-start', md: 'center', lg: 'center' }
      }}
    >
      <LabelSection />
      <InputSection />
    </Stack>
  )
}

export default EmailFormContainer
