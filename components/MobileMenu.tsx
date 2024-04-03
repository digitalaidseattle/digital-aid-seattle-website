/*
 * Masthead.tsx
 * @2023 Digital Aid Seattle
 */

import {
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ReactNode } from 'react'

type MobileMenuProps = {
  children: ReactNode;
}

const MobileMenu = ({ children }: MobileMenuProps) => {
  return (
  <Stack sx={{
    backgroundColor: 'green',
    height: '100vh',
  }}>
    {children}
  </Stack>

  )
}

export default MobileMenu;