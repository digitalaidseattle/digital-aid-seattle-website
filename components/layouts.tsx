import styled from '@emotion/styled'
import React from 'react'
import { theme } from 'theme/theme'
import GlobalStyles from '@mui/material/GlobalStyles'
import CssBaseline from '@mui/material/CssBaseline'

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
