import { Button, Stack, Typography, useTheme } from '@mui/material'
import EmailFormInput from './EmailFormInput'

const EmailFormContainer = () => {
  const theme = useTheme()

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
      <Stack
        gap={'2rem'}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '100%', lg: 'auto' },
        }}
      >
        <EmailFormInput />
        <Button
          sx={{
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark,
          }}
        >
          Sign up
        </Button>
      </Stack>
    </Stack>
  )
}

export default EmailFormContainer
