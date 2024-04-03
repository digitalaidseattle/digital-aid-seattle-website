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
  const theme = useTheme()

  return (
  <Stack sx={{
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    gap: '1.5rem',
    paddingY: '2.5rem',
    backgroundColor: theme.palette.primary.main,
}}>
    {children}
  </Stack>

  )
}

export default MobileMenu;