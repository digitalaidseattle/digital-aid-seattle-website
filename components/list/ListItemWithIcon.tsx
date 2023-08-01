import { Box, useTheme } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

type ListItemWithIconProps = {
  listIcon?: ReactNode
  listText?: string
}

const ListItemWithIcon = ({ listIcon, listText }: ListItemWithIconProps) => {
  const theme = useTheme()
  const palette = theme.palette

  return (
    <ListItem
      sx={{
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
      }}
    >
      {listIcon && (
        <ListItemIcon sx={{ color: palette.primary.light }}>
          {listIcon}
        </ListItemIcon>
      )}
      {listText && (
        <ListItemText
          primary={
            <Typography
              variant="labelMedium"
              color={palette.secondary.contrastText}
            >
              {listText}
            </Typography>
          }
        />
      )}
    </ListItem>
  )
}

export default ListItemWithIcon
