import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

type CardWithPhotoProps = {
  title: string
  description: string
  image: string
  imageWidth?: number
  alt?: string
  date?: string
  titleSx?: Record<string, any>
  descriptionSx?: Record<string, any>
}

const CardWithPhoto = ({
  title,
  description,
  image,
  imageWidth = 196,
  alt = '',
  date,
  titleSx,
  descriptionSx,
}: CardWithPhotoProps) => {
  const theme = useTheme()
  const isViewportSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Card
      sx={{
        flex: '1',
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
      }}
    >
      {
        <CardMedia
          sx={{
            minWidth: imageWidth,
            aspectRatio: '1/1',
          }}
          component="img"
          image={image}
          alt={alt}
        />
      }
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.5rem',
          paddingBottom: '1rem !important',
        }}
      >
        <Typography variant="titleMedium" sx={titleSx}>
          {title}
        </Typography>
        {date && (
          <Typography
            variant="bodySmall"
            color="text.primary"
            sx={{ fontWeight: 700 }}
          >
            {new Date(date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        )}

        <Typography variant="bodyMedium" sx={descriptionSx}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardWithPhoto
