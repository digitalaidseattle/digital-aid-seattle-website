import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

type CardWithPhotoProps = {
  title: string
  description: string
  image: string
  imageWidth?: number
}

const CardWithPhoto = ({
  title,
  description,
  image,
  imageWidth = 196,
}: CardWithPhotoProps) => {
  const theme = useTheme()
  const isViewportSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card
      sx={{
        flex: '1',
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
      }}
    >
      {!isViewportSmall && (
        <CardMedia
          sx={{
            minWidth: imageWidth,
            aspectRatio: '1/1',
          }}
          image={image}
        />
      )}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <Typography variant="titleMedium">{title}</Typography>
        <Typography variant="bodyMedium">{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardWithPhoto
