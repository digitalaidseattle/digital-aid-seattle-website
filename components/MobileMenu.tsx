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
}

const MobileMenu = ({ children, yTranslate }: MobileMenuProps) => {
  const theme = useTheme()

  return (
  <List 
    aria-label="navigation"
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
      transition: 'all 0.66s ease',
  }}>
      {children}
    </List>
  )
}

export default MobileMenu;