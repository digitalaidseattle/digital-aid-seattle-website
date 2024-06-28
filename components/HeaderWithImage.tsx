/*
 * @2024 Digital Aid Seattle
 *
 * Desktop design of page heading with square image, 
 * as seen on the individual project and event pages. 
*/
import {
  Box,
  Stack,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ReactNode } from 'react'

type HeaderWithImageProps = {
  imageSrc: string,
  children: ReactNode // takes the JSX for content that is put in the green section
}

export const HeaderWithImage = (props: HeaderWithImageProps) => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  function MobileDesign() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: '100%',
            height: '30rem',
            position: 'absolute',
            zIndex: '0'
          }}
        ></Box>
        <Stack
          spacing="2rem"
          sx={{
            position: 'relative',
            padding: '4rem 1rem 0rem 1rem',
            color: theme.palette.primary.contrastText
          }}
        >
          {props.children}
          <Box sx={{
            width: '75%',
            margin: 'auto',
            marginTop: '1rem',
            aspectRatio: '1 / 1',
            borderRadius: '20px',
            boxShadow:
              '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
            backgroundColor: '#fff',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden'
          }}>
            <img
              src={props.imageSrc}
              style={{ width: '100%' }}
            />
          </Box>
        </Stack>
      </>
    )
  }

  function DesktopDesign() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            width: '100%',
          }}
        >
          {/* TODO: max-width of 880px is hardcoded throughout the site */}
          <Box sx={{
            maxWidth: '880px',
            minHeight: '18rem',
            margin: { md: '0', lg: '0 auto' },
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            position: 'relative',
            paddingY: '1rem',
            paddingX: { md: '2rem', lg: 0 },
          }}>
            {props.children}
            <Box
              sx={{
                width: { md: '16rem', lg: '18rem' },
                position: 'absolute',
                right: { md: '2rem', lg: '0px' },
                bottom: { md: '-4rem', lg: '-5rem' },
                zIndex: '2',
                aspectRatio: '1/1',
                backgroundColor: '#fff',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '20px',
                boxShadow:
                  '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
                overflow: 'hidden',
                objectFit: 'cover'
              }}
            >
              <img
                src={props.imageSrc}
                style={{
                  width: '100%',
                }}
              />
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  return extraSmallScreen ? <MobileDesign /> : <DesktopDesign />

}
