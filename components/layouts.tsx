import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'
import { theme } from 'theme/theme'

import CommonHeader from './CommonHeader'

export const HeaderContainer = styled.header``

export const MainContainer = styled.main`
  position: relative;
  padding: 5rem;
  text-align: center;
`

export const FooterContainer = styled.footer`
  background: ${theme.palette.primary.dark};
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2.5rem;
  text-align: center;
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
        <Typography sx={{ color: 'white' }}>
          I am a footer! To be replaced with a component here.
        </Typography>
      </FooterContainer>
    </>
  )
