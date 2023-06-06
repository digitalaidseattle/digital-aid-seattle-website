import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

const PartnersPage = () => {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is the new Partner page for you to fill.
      </Typography>
    </>
  )
}

export default withBasicLayout(PartnersPage)
