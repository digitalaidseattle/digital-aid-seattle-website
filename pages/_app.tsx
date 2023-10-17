import 'styles/global.css'
import 'styles/preflight.css'
import Head from 'next/head'

import { ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { theme } from 'theme/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Free tech solutions for Puget Sound nonprofits | Digital Aid Seattle
        </title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
