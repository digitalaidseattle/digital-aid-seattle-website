import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

const HomePage = () => {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is the new homepage for you to fill.
      </Typography>
    </>
  )
}

export default withBasicLayout(HomePage)
