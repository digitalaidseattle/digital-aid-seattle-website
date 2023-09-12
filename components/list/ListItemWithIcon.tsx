import { Box, useTheme } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

type ListItemWithIconProps = {
  listIcon?: ReactNode
  listText?: string
  sxProps?: object
}

const ListItemWithIcon = ({
  listIcon,
  listText,
  sxProps,
}: ListItemWithIconProps) => {
  const theme = useTheme()
  const palette = theme.palette

  return (
    <ListItem
      sx={{
        height: '3.5rem',
        overflowWrap: 'break-word',
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
        ...sxProps,
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
              sx={{
                textTransform: 'capitalize',
                display: 'inline-block',
              }}
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
