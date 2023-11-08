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
  const path = usePathname().split('/')
  let page_name = path[path.length - 1]
  const searchParams = useSearchParams()
  if (page_name === 'project_individual') {
    page_name = searchParams.get('project')
  }

  const [title, setTitle] = useState(DEFAULT_TAG)
  useEffect(() => {
    const tag = tagNames[page_name]
    setTitle(tag ? tag : DEFAULT_TAG)
  }, [page_name])
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
