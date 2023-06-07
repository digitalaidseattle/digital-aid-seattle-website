import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

const VolunteerPage = () => {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is the new Volunteer page for you to fill.
      </Typography>
    </>
  )
}

export default withBasicLayout(VolunteerPage)
