/*
 * Masthead.tsx
 * @2023 Digital Aid Seattle
 */

import {
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'

type MastheadProps = {
  title: string
}

// type casting (with typeof) allows a "component" prop to be passed to the styled typography
// for semantic purposes (e.g. making sure it renders as an H1)

const MobileHeader = styled(Typography)(({ theme }) => ({
  padding: '4rem 0',
  width: '100%',
  textAlign: 'center',
})) as typeof Typography

const DesktopHeader = styled(Typography)(({ theme }) => ({
  padding: '5rem 0',
  width: '100%',
  textAlign: 'center',
})) as typeof Typography

const Masthead = ({ title }: MastheadProps) => {
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      {smallScreen ? (
        <MobileHeader variant="displayMedium" component="h1">
          {title}
        </MobileHeader>
      ) : (
        <DesktopHeader variant="displayLarge" component="h1">
          {title}
        </DesktopHeader>
      )}
    </Stack>
  )
}

export default Masthead
