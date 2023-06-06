import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

const AboutPage = () => {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is the new About page for you to fill.
      </Typography>
    </>
  )
}

export default withBasicLayout(AboutPage)
