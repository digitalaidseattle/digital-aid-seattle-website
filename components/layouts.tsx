import styled from '@emotion/styled'
import React from 'react'
import { theme } from 'theme/theme'

import CommonFooter from './CommonFooter'
import CommonHeader from './CommonHeader'

export const HeaderContainer = styled.header``

// bottom padding is to compensate for footer
// added background for now to override the default tailwind..
export const MainContainer = styled.main`
  background: ${theme.palette.primary.contrastText};
  position: relative;
  width: 100%;
`

export const FooterContainer = styled.footer`
  background: ${theme.palette.primary.dark};
  bottom: 0;
  width: 100%;
`

// eslint-disable-next-line react/display-name
export const withBasicLayout = (Page: () => JSX.Element) => () =>
  (
    <>
      <HeaderContainer>
        <CommonHeader />
      </HeaderContainer>
      <MainContainer>
        <Page />
      </MainContainer>
      <FooterContainer>
        <CommonFooter />
      </FooterContainer>
    </>
  )
