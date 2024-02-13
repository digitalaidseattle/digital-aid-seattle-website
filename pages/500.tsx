/*
* @2023 Digital Aid Seattle
*/
import { Box, useTheme } from '@mui/material'
import ErrorComponent from 'components/ErrorComponent'
import Masthead from 'components/Masthead'
import { withBasicLayout } from 'components/layouts'
import ErrorImage from '../assets/500-error.png'

function Page500() {
  const theme = useTheme()

  const title = 'Oops!';

  return (
    <>
      <Masthead title={title} />
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ErrorComponent title="System Error"
          description="Something went wrong. Please head back to our home page to continue your journey."
          imageSrc={ErrorImage.src}
          imageTitle="System Error Image" />
      </Box>
    </>
  )
}

export default withBasicLayout(Page500)
