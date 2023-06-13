import { ReactNode } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { designColor } from 'theme/theme'

type ListItemWithIconProps = {
  listIcon: ReactNode
  listText: string
}

const ListItemWithIcon = ({ listIcon, listText }: ListItemWithIconProps) => {
  return (
    <ListItem
      sx={{
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
      }}
    >
      <ListItemIcon sx={{ color: designColor.green.light }}>
        {listIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="labelMedium" color={designColor.black}>
            {listText}
          </Typography>
        }
      />
    </ListItem>
  )
}

export default ListItemWithIcon
