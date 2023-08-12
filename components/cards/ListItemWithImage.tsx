import { useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

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
  const theme = useTheme()
  const palette = theme.palette

  return (
    <ListItem
      sx={{
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
      }}
    >
      <ListItemAvatar sx={{ color: palette.primary.light }}>
        <Avatar alt={listImageAltText} src={listImage} />
      </ListItemAvatar>
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
    </ListItem>
  )
}

export default ListItemWithImage
