import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'

const ProjectsPage = () => {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is the new projects page for you to fill. Maybe we will use sanity
        when there are many many projects.
      </Typography>
    </>
  )
}

export default withBasicLayout(ProjectsPage)
