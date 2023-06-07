import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

const EventsPage = () => {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is where we show people how to get involved.
      </Typography>
    </>
  )
}

export default withBasicLayout(EventsPage)
