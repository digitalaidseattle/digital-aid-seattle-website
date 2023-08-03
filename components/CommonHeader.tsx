/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import { useRouter } from 'next/router'
import * as React from 'react'
import { theme } from 'theme/theme'
import useMediaQuery from '@mui/material/useMediaQuery'

import OSLogo from '../assets/darkThemeLogo.svg'

const page_mapping = {
  About: '/about',
  Projects: '/projects',
  Partners: '/partners',
  Volunteer: '/volunteers_new',
  Events: '/events',
}

const CommonHeader = () => {
  // React states and functions for handling the hamburger menu.
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const isSmallScreen = useMediaQuery('(max-width:700px)')

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const router = useRouter()
  const currentRoute = router.route

  return (
    <AppBar position="static" sx={{ background: theme.palette.primary.main }}>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'flex', lg: 'none' },
            justifyContent: 'space-between',
          }}
        >
          {/* Hamburger menu when the screen is small. */}
          {/* LOGO */}
          <img
            src={OSLogo.src}
            style={{
              height: '80%',
              width: '120px',
            }}
          />
          <IconButton
            size="large"
            aria-label="page-info"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
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
              display: { xs: 'block', md: 'none' },
            }}
          >
            {Object.keys(page_mapping).map((name) => (
              <MenuItem
                key={name}
                onClick={handleCloseNavMenu}
                style={{ borderRadius: '0px' }}
              >
                <Link
                  underline="hover"
                  sx={{
                    color: theme.palette.primary.dark,
                  }}
                  href={page_mapping[name]}
                >
                  {name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* Menu items that are shown on desktop */}
        <Container
          sx={{
            flexGrow: 1,
            display: { xs: 'none', lg: 'flex' },
            justifyContent: 'space-between',
          }}
        >
          {/* LOGO */}
          <img
            src={OSLogo.src}
            style={{
              height: '80%',
              width: '120px',
              // margin: '0px 60px 0px 0px',
            }}
          />
          <Box>
            {Object.keys(page_mapping).map((name) => (
              <Button
                key={name}
                onClick={handleCloseNavMenu}
                sx={{
                  color: theme.palette.primary.contrastText,
                  borderRadius: '0px',
                }}
                disableRipple={true}
              >
                <Link
                  underline="hover"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    'text-underline-offset': '0.5rem',
                    textDecoration:
                      currentRoute === page_mapping[name]
                        ? 'underline'
                        : 'none',
                  }}
                  href={page_mapping[name]}
                >
                  {name}
                </Link>
              </Button>
            ))}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
export default CommonHeader
