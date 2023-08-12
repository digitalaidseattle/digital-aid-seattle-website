import 'styles/global.css'
import 'styles/preflight.css'

import { ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { theme } from 'theme/theme'

export default function App({ Component, pageProps }: AppProps) {
  console.log(pageProps)
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
