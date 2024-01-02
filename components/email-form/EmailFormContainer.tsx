import { Button, Stack, Typography, useTheme } from '@mui/material'
import EmailFormInput from './EmailFormInput'

const EmailFormContainer = () => {
  const theme = useTheme()

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Typography
        variant="headlineMedium"
        sx={{ color: theme.palette.primary.contrastText }}
      >
        Sign up for our newsletter
      </Typography>
      <Stack direction={'row'} gap={'2rem'}>
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
