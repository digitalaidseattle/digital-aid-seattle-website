import { Stack, useTheme } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { ReactNode } from 'react'

type ListItemWithIconProps = {
  listIcon?: ReactNode
  listText?: string
  sxProps?: object
  children?: ReactNode
}

const ListItemWithIcon = ({
  listIcon,
  listText,
  sxProps,
  children
}: ListItemWithIconProps) => {
  const theme = useTheme()
  const palette = theme.palette

  return (
    <ListItem
      sx={{
        overflowWrap: 'break-word',
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
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
            <Stack spacing={'1rem'}>
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
              {children}
            </Stack>
          }
        />
      )}
    </ListItem>
  )
}

export default ListItemWithIcon
