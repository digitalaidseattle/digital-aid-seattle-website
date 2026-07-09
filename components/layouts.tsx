import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'

import { Box, Grid, LinearProgress, styled, useTheme } from '@mui/material'
import { ReactNode, createContext, useContext, useState } from 'react'
import CommonFooter from './CommonFooter'
import CommonHeader from './CommonHeader'

// bottom padding is to compensate for footer
// added background for now to override the default tailwind..

const MainContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  position: 'relative',
  width: '100%'
}))

const FooterContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.contrastText,
  bottom: 0,
  width: '100%',
}))

export const LoadingContext = createContext({
  loading: true,
  setLoading: (b: boolean) => { },
})

export const BlockComponent = (props: { children: ReactNode, block: boolean }): JSX.Element => {
  const theme: any = useTheme();
  return (
    props.block
      ? <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        bgcolor={theme.palette.primary.default}
        sx={{ minHeight: '100vh', opacity: '0.1' }}
      >
        <Grid item xs={3}>
          <img src="/logo-light-icon.svg" />
        </Grid>
      </Grid>
      : <>{props.children}</>
  )
}

const LoadingIndicator = (): JSX.Element => {
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

const WrappdMainContainer = (props: { children: ReactNode }): JSX.Element => {
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
