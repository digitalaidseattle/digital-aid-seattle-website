/*
 * MastheadWithImage.tsx
 * @2023 Digital Aid Seattle
 */

import { ReactNode } from 'react'
import SectionContainer from './layout/SectionContainer'
import { Box, useMediaQuery, useTheme } from '@mui/material'

type MastheadWithImageProps = {
  children: ReactNode
  imageSrc: string
  imageText?: string
}

const MastheadWithImage = ({
  children,
  imageSrc,
  imageText,
}: MastheadWithImageProps) => {
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  return (
    <SectionContainer backgroundColor={theme.palette.primary.main}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: '40px' },
        }}
        maxWidth={'880px'}
      >
        <Box
          sx={{
            textAlign: 'left',
            width: '100%',
            maxWidth: largeScreen ? '418px' : '950px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem  ',
          }}
        >
          {children}
        </Box>
        <img
          src={imageSrc}
          alt="" // left blank for decorative images
          width="418px"
          style={{
            objectFit: 'cover',
            filter: 'drop-shadow(0px 1px 50px rgba(245, 239, 93, 0.24))',
          }}
        />
      </Box>
    </SectionContainer>
  )
}

export default MastheadWithImage
