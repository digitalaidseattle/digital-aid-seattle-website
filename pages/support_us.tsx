import { Typography, useTheme } from '@mui/material'
import { BlockComponent, withBasicLayout } from 'components/layouts'

const SupportUsPage = () => {
  const theme = useTheme()

  return (
    <BlockComponent block={true}>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is where we ask people to give us money and free stuff :D
      </Typography>
    </BlockComponent>
  )
}

export default withBasicLayout(SupportUsPage)
