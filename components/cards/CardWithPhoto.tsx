import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

type CardWithPhotoProps = {
  title: string
  description: string
  image: string
  imageHeight?: number
}

const CardWithPhoto = ({
  title,
  description,
  image,
  imageHeight = 196,
}: CardWithPhotoProps) => {
  return (
    <Card
      sx={{
        flex: '1',
        minWidth: { xs: '100%', sm: 'min-content' },
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
      }}
    >
      <CardMedia
        sx={{
          height: imageHeight,
        }}
        image={image}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <Typography variant="titleLarge">{title}</Typography>
        <Typography variant="bodyMedium">{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardWithPhoto
