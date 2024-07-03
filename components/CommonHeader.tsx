/*
 * @2023 Digital Aid Seattle
 */
/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { theme } from 'theme/theme'

import OSLogo from '../assets/darkThemeLogo.svg'
import MobileMenu from './MobileMenu'

const SECTION_TO_PATH = {
  About: '/about',
  Projects: '/projects',
  Partners: '/partners',
  Volunteer: '/volunteers',
  Events: '/events',
}

const PATH_TO_SECTION = {
  '/about': 'About',
  '/projects': 'Projects',
  '/project': 'Projects',
  '/partners': 'Partners',
  '/volunteers': 'Volunteer',
  '/volunteer': 'Volunteer',
  '/events': 'Events',
  '/event': 'Events'
}


const CommonHeader = () => {
  // React states for handling the hamburger menu.
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const router = useRouter()

  const isCurrent = (name: string) => {
    return name === PATH_TO_SECTION[router.route];
  }

  return (
    // Containing Box is given AppBar's z-index; ensures it always stays on top.
    // z-index taken from docs: https://mui.com/material-ui/customization/z-index/
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: theme.palette.primary.main,
        }}
      >
        <Toolbar sx={{ padding: '0 !important' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', lg: 'none' },
              justifyContent: 'space-between',
              padding: {
                xs: '1rem 1rem',
                md: '1rem 2rem',
                lg: '1.25rem 0',
              },
            }}
          >
            {/* Hamburger menu when the screen is small. */}
            {/* LOGO */}
            <Link href="/">
              <img
                src={OSLogo.src}
                style={{
                  width: '120px',
                }}
                alt="Digital Aid Seattle Home"
              />
            </Link>
            <IconButton
              size="large"
              aria-label="page-info"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              sx={{ color: theme.palette.primary.contrastText }}
            >
              {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          {/* Menu items that are shown on desktop */}
          <Container
            disableGutters
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'none', lg: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.25rem 2.5rem !important',
            }}
          >
            {/* LOGO */}
            <Link href="/">
              <img
                src={OSLogo.src}
                style={{
                  width: '120px',
                }}
                alt="Digital Aid Seattle Home"
              />
            </Link>
            <nav>
              <ul>
                {Object.keys(SECTION_TO_PATH).map((name) => (
                  <Button
                    key={name}
                    variant="contained"
                    color={isCurrent(name)
                      ? 'success'
                      : 'primary'}
                    disableRipple={true}
                  >
                    <Link
                      sx={{
                        color: theme.palette.primary.contrastText,
                        textUnderlineOffset: '0.5rem',
                        textDecoration: isCurrent(name)
                          ? 'underline'
                          : 'none'
                      }}
                      href={SECTION_TO_PATH[name]}
                    >
                      {name}
                    </Link>
                  </Button>
                ))}
              </ul>
            </nav>
          </Container>
        </Toolbar>
      </AppBar>
      {/* mobile slide-out menu */}
      {smallScreen &&
        <Box sx={{ position: 'relative', zIndex: -1 }}>
          <MobileMenu yTranslate={showMobileMenu ? '0' : '-500px'}>
            {Object.keys(SECTION_TO_PATH).map((name) => (
              <MenuItem
                key={name}
                style={{ borderRadius: '0px' }}
              >
                <Link
                  underline="hover"
                  sx={{
                    color: theme.palette.primary.contrastText,
                  }}
                  href={SECTION_TO_PATH[name]}
                >
                  <Typography variant="labelLarge">
                    {name}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </MobileMenu>
        </Box>}
    </Box>
  )
}
export default CommonHeader
