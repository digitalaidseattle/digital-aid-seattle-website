/*
* @2023 Digital Aid Seattle
*/
import { Box, useTheme } from '@mui/material'
import ErrorComponent from 'components/ErrorComponent'
import Masthead from 'components/Masthead'
import { withBasicLayout } from 'components/layouts'
import ErrorImage from '../assets/404-error.png'

const Labels = {
  masthead: 'Page Not Found',
  componentTitle: '404',
  description: 'Unfortunately, the page you are trying to access could not be located. Please return to our home page to continue your journey.',
  imageTitle: '04 Error Image'
}
function Page404() {
  const theme = useTheme()

  return (
    <>
      <Masthead title={Labels.masthead} />
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ErrorComponent title={Labels.componentTitle}
          description={Labels.description}
          imageSrc={ErrorImage.src}
          imageTitle={Labels.imageTitle} />
      </Box>
    </>
  )
}

export default withBasicLayout(Page404)
