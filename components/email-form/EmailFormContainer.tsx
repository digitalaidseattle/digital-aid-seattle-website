import { Button, Snackbar, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { emailService } from 'services/EmailService'
import { useFeature } from 'services/FeatureService'
import EmailFormInput from './EmailFormInput'

const LabelSection = () => {
  const theme = useTheme()

  return (
    <Stack
      direction={'column'}
      sx={{
        width: { xs: '100%' },
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
  const theme = useTheme()

  const [email, setEmail] = useState('')
  const [snackMessage, setSnackMessage] = useState('')
  const [snackColor, setSnackColor] = useState('red')
  const [error, setError] = useState('')

  function setErrorNotification(message: string) {
    setSnackMessage(message)
    setSnackColor('red')
  }

  function setSucessNotification(message: string) {
    setSnackMessage(message)
    setSnackColor('green')
  }

  function clearNotification() {
    setSnackMessage('')
    setSnackColor('green')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (emailService.isValid(email)) {
      emailService
        .subscribe(email)
        .then(() => {
          setEmail('')
          setSucessNotification('Thank you for subscribing.')
        })
        .catch((err) => {
          console.error(err)
          setErrorNotification(
            'We are experiencing technical issues.  Please try again later.'
          )
        })
        .finally(() => setError(''))
    } else {
      setError('Not a valid email address.')
    }
  }

  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: 'row', lg: 'row' },
      }}
    >
      <Stack>
        <Snackbar
          open={snackMessage !== ''}
          autoHideDuration={6000}
          onClose={() => clearNotification()}
          message={
            <>
              <Typography fontWeight={500}>{snackMessage}</Typography>
            </>
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ContentProps={{
            sx: {
              background: snackColor,
            },
          }}
        />
        <form onSubmit={handleSubmit}>
          <Stack
            gap="1rem"
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <EmailFormInput
              userEmail={email}
              handleEmailInput={(formInput) => setEmail(formInput)}
              error={error}
            />
            {error && (
              <Typography
                sx={{
                  display: { xs: 'flex', md: 'none', lg: 'none' },
                  paddingLeft: '1rem',
                  color: theme.palette.error.main,
                }}
              >
                Error: {error}
              </Typography>
            )}
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
          {error && (
            <Typography
              sx={{
                display: { xs: 'none', md: 'flex', lg: 'flex' },
                paddingLeft: '1rem',
                color: theme.palette.error.main,
              }}
            >
              Error: {error}
            </Typography>
          )}
        </form>
      </Stack>
    </Stack>
  )
}

const EmailFormContainer = ({ showLabel }) => {
  const { data: newsLetter } = useFeature('newsletter')
  const labelSection = showLabel ? <LabelSection /> : null

  return (
    newsLetter && (
      <Stack
        sx={{
          paddingTop: { xs: '3rem', md: '5rem', lg: '5rem' },
          flexDirection: { xs: 'column', md: 'column', lg: 'row' },
          alignItems: { xs: 'flex-start', md: 'flex-start', lg: 'center' },
        }}
      >
        {labelSection}
        <InputSection />
      </Stack>
    )
  )
}

export default EmailFormContainer
