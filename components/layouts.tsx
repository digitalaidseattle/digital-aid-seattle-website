import styled from '@emotion/styled'
import React from 'react'
import { theme } from 'theme/theme'

import CommonFooter from './CommonFooter'
import CommonHeader from './CommonHeader'

export const HeaderContainer = styled.header``

export const MainContainer = styled.main`
  position: relative;
  // padding: 5rem;
  text-align: center;
`

export const FooterContainer = styled.footer`
  background: ${theme.palette.primary.dark};
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2.5rem;
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
        <CommonFooter/> 
      </FooterContainer>
    </>
  )
