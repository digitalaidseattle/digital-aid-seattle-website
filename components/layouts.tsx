import styled from '@emotion/styled'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { theme } from 'theme/theme'

import CommonFooter from './CommonFooter'
import CommonHeader from './CommonHeader'
import { ReactNode, createContext, useContext, useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, CircularProgress, LinearProgress } from '@mui/material'

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

const LoadingIndicator = (): ReactJSXElement => {
  const { loading, setLoading } = useContext(LoadingContext);

  // creating an overlay effect
  return (loading &&
    <Box sx={{
      zIndex: 2,
      position: 'fixed',
      width: '100%'
    }}>
      <LinearProgress color="success" />
    </Box>
  )
}

const WrappdMainContainer = (props: { children: ReactNode }): ReactJSXElement => {
  const [loading, setLoading] = useState(true)

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

    <MainContainer>
      <Page />
    </MainContainer>
    <FooterContainer>
      <CommonFooter />
    </FooterContainer>
  </>
)

// eslint-disable-next-line react/display-name
export const withBasicLayoutLoading = (Page: () => JSX.Element) => () =>
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