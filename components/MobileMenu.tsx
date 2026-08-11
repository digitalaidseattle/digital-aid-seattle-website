/*
 * Masthead.tsx
 * @2023 Digital Aid Seattle
 */

import {
  List,
  useTheme,
} from '@mui/material'
import { ReactNode } from 'react'

type MobileMenuProps = {
  children: ReactNode;
  yTranslate: string;
  open: boolean;
}

const MobileMenu = ({ children, yTranslate, open }: MobileMenuProps) => {
  const theme = useTheme()

  return (
  <List 
    aria-label="navigation"
    // Closed, the menu is only moved off-screen, so it stays focusable without this.
    aria-hidden={!open}
    inert={!open}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      gap: '1.5rem',
      paddingY: '2.5rem',
      backgroundColor: theme.palette.primary.main,
      borderBottom: `2px solid ${theme.palette.text.primary}`,
      transform: `translateY(${yTranslate})`,
      transition: 'transform 0.25s ease',
  }}>
      {children}
    </List>
  )
}

export default MobileMenu;