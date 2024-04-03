/*
 * @2023 Digital Aid Seattle
 */
/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import { useRouter } from 'next/router'
import * as React from 'react'
import { theme } from 'theme/theme'
import MobileMenu from './MobileMenu'

import OSLogo from '../assets/darkThemeLogo.svg'

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
  '/project_individual': 'Projects',
  '/partners': 'Partners',
  '/volunteers': 'Volunteer',
  '/volunteer_role': 'Volunteer',
  '/events': 'Events',
  '/event': 'Events'
}


const CommonHeader = () => {
  // React states and functions for handling the hamburger menu.
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const router = useRouter()

  const isCurrent = (name: string) => {
    return name === PATH_TO_SECTION[router.route];
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: theme.palette.primary.main,
      }}
    >
      <Box sx={{position: 'relative'}}>
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
            onClick={()=>setShowMobileMenu(!showMobileMenu)}
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', lg: 'none' },
              width: '100vw',
              backgroundColor: 'red'
            }} */}
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
                  onClick={handleCloseNavMenu}
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
      {showMobileMenu && 
        <MobileMenu> 
            {Object.keys(SECTION_TO_PATH).map((name) => (
              <MenuItem
                key={name}
                onClick={handleCloseNavMenu}
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
          </MobileMenu>}
          </Box>
    </AppBar>
  )
}
export default CommonHeader
