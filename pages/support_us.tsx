/*
 * @2024 Digital Aid Seattle
 */
import { Typography, useTheme } from '@mui/material'
import { withBasicLayout } from 'components/layouts'
import { useEffect } from 'react'
import { useFeature } from './api/FeatureService'
import { useRouter } from 'next/router'

const SupportUsPage = () => {
  const theme = useTheme()
  const { data: supportUs } = useFeature('support-us');
  const router = useRouter();

  useEffect(() => {
    if (supportUs !== undefined && supportUs === false) {
      console.error(`Support Us feature not implemented.`);
      router.push('/404')
    }
  }, [supportUs])

  return (
    <>
      <Typography sx={{ color: theme.palette.primary.main }}>
        This is where we ask people to give us money and free stuff :D
      </Typography>
    </>
  )
}

export default withBasicLayout(SupportUsPage)
