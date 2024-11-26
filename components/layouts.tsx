import styled from '@emotion/styled'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { theme } from 'theme/theme'

import { useTheme } from '@emotion/react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, Grid, LinearProgress } from '@mui/material'
import { ReactNode, createContext, useContext, useState } from 'react'
import CommonFooter from './CommonFooter'
import CommonHeader from './CommonHeader'

// bottom padding is to compensate for footer
// added background for now to override the default tailwind..
export const MainContainer = styled.main`
  background: ${theme.palette.primary.contrastText};
  position: relative;
  width: 100%;
`

export const FooterContainer = styled.footer`
  background: ${theme.palette.secondary.contrastText};
  bottom: 0;
  width: 100%;
`

export const LoadingContext = createContext({
  loading: true,
  setLoading: (b: boolean) => { },
})

export const BlockComponent = (props: { children: ReactNode, block: boolean }): ReactJSXElement => {
  const theme: any = useTheme();
  return (
    props.block
      ? <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        bgcolor={theme.palette.background.default}
        sx={{ minHeight: '100vh', opacity: '0.1' }}
      >
        <Grid item xs={3}>
          <img src="/logo-light-icon.svg" />
        </Grid>
      </Grid>
      : <>{props.children}</>
  )
}

const LoadingIndicator = (): ReactJSXElement => {
  const { loading, setLoading } = useContext(LoadingContext);

  // creating an overlay effect
  return (
    <>{loading &&
      <Box sx={{
        zIndex: 2,
        position: 'fixed',
        width: '100%'
      }}>
        <LinearProgress color="success" />
      </Box>
    }</>
  )
}

const WrappdMainContainer = (props: { children: ReactNode }): ReactJSXElement => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <MainContainer>
        <LoadingIndicator />
        {props.children}
      </MainContainer>
    </LoadingContext.Provider>
  );
}

// eslint-disable-next-line react/display-name
export const withBasicLayout = (Page: () => JSX.Element) => () =>
(
  <>
    <CssBaseline />
    <GlobalStyles
      styles={{
        a: {
          color: 'inherit',
          textDecoration: 'inherit',
        },
      }}
    />
    <CommonHeader />

    <WrappdMainContainer>
      <Page />
    </WrappdMainContainer>
    <FooterContainer>
      <CommonFooter />
    </FooterContainer>
  </>
)
