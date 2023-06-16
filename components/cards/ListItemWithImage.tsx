import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { designColor } from 'theme/theme'

type ListItemWithImageProps = {
  listText: string
  listImage: string
  listImageAltText?: string
}

const ListItemWithImage = ({
  listText,
  listImage,
  listImageAltText = 'decorative',
}: ListItemWithImageProps) => {
  return (
    <ListItem
      sx={{
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
      }}
    >
      <ListItemAvatar sx={{ color: designColor.green.light }}>
        <Avatar alt={listImageAltText} src={listImage} />
      </ListItemAvatar>
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

export default ListItemWithImage
