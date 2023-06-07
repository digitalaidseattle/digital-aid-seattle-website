import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

const SupportUsPage = () => {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is where we ask people to give us money and free stuff :D
      </Typography>
    </>
  )
}

export default withBasicLayout(SupportUsPage)
