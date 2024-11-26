import { Button, Snackbar, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { emailService } from 'pages/api/EmailService'
import { useFeature } from 'pages/api/FeatureService'
import EmailFormInput from './EmailFormInput'

const LabelSection = () => {
  const theme = useTheme();

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
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (emailService.isValid(email)) {
      emailService.subscribe(email)
        .then(success => {
          if (success) {
            setSubscribeMessage("Thank you for subscribing.");
          }
        })
        .catch(err => console.error(err))
        .finally(() => setError(''))
    } else {
      setError('Not a valid email address.')
    }
  }

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: 'row', lg: 'row' },
      }}>
      <Stack>
        <Snackbar
          open={subscribeMessage !== ''}
          autoHideDuration={6000}
          onClose={() => setSubscribeMessage('')}
          message={<><Typography fontWeight={500}>{subscribeMessage}</Typography></>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ContentProps={{
            sx: {
              background: "green"
            }
          }}
        />
        <form onSubmit={handleSubmit}>
          <Stack gap='1rem'
            sx={{
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
              type="submit"
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
        </form>
      </Stack>
    </Stack>
  )
}

const EmailFormContainer = () => {
  const { data: newsLetter } = useFeature('newsletter')

  return (
    <>
      {newsLetter &&
        <Stack
          sx={{
            paddingTop: { md: '5rem', lg: '5rem' },
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-start', lg: 'center' }
          }}
        >
          <LabelSection />
          <InputSection />
        </Stack>
      }
    </>
  )
}

export default EmailFormContainer
