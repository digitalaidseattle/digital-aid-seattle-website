import 'styles/global.css'
import 'styles/preflight.css'
import Head from 'next/head'

import { ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { theme } from 'theme/theme'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const DEFAULT_TAG =
  'Free tech solutions for Puget Sound nonprofits | Digital Aid Seattle'
const tagNames = {
  events: 'Events | Digital Aid Seattle',
  volunteers: 'Volunteer with us | Digital Aid Seattle',
  partners: 'Get help with your nonprofit | Digital Aid Seattle',
  about: 'About us | Digital Aid Seattle',
  projects: 'Projects | Digital Aid Seattle',
  privacy: 'Privacy policy | Digital Aid Seattle',
  'the-cadre': 'The Cadre | Digital Aid Seattle',
  'seattle-humane': 'Seattle Humane | Digital Aid Seattle',
}

export default function App({ Component, pageProps }: AppProps) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  let pageName = null
  if (pathName !== null) {
    const path = pathName.split('/')
    pageName = path[path.length - 1]
    if (pageName === 'project_individual') {
      pageName = searchParams.get('project')
    }
  }
  const [title, setTitle] = useState(DEFAULT_TAG)
  useEffect(() => {
    const tag = tagNames[pageName]
    setTitle(tag ? tag : DEFAULT_TAG)
  }, [pageName])
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
