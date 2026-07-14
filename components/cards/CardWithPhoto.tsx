import Link from '@mui/material/Link'
import { LinkedIn } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

type CardWithPhotoProps = {
  title: string
  description: string
  image?: string
  imageWidth?: number
  alt?: string
  subtitle?: string
  // undefined -> no LinkedIn icon; '' -> static icon (no link); url -> clickable icon
  linkedInUrl?: string
  titleSx?: Record<string, any>
  subtitleSx?: Record<string, any>
  descriptionSx?: Record<string, any>
  mediaSx?: Record<string, any>;
  onClick?: () => void;
}

const CardWithPhoto = ({
  title,
  description,
  image,
  imageWidth = 196,
  alt = '',
  subtitle,
  linkedInUrl,
  titleSx,
  subtitleSx,
  descriptionSx,
  mediaSx,
  onClick,
}: CardWithPhotoProps) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow:
          '0px 4px 8px 2px rgba(52, 61, 62, 0.04), 0px 2px 4px rgba(52, 61, 62, 0.04)',
        cursor: onClick ? 'pointer' : undefined,
      }}
      onClick={onClick}
    >
      {image &&
        <CardMedia
          sx={mediaSx ?? {
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
          justifyContent: 'flex-start',
          flexGrow: 1,
          gap: '0.5rem',
          paddingBottom: '1rem !important',
        }}
      >
        <Typography variant="titleMedium" sx={titleSx}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="bodySmall"
            color="text.primary"
            sx={{ fontWeight: 700, ...subtitleSx }}
          >
            {subtitle}
          </Typography>
        )}

        {description && (
          <Typography variant="bodyMedium" sx={descriptionSx}>
            {description}
          </Typography>
        )}
        {linkedInUrl !== undefined &&
          (linkedInUrl ? (
            <Link
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label={`${title}'s LinkedIn profile, which opens in a new window.`}
              onClick={(e) => e.stopPropagation()}
              sx={{ alignSelf: 'flex-start', marginTop: 'auto', lineHeight: 0 }}
            >
              <LinkedIn sx={{ color: theme.palette.text.primary }} fontSize="medium" />
            </Link>
          ) : (
            <LinkedIn
              titleAccess={`${title} on LinkedIn`}
              sx={{
                color: theme.palette.text.primary,
                alignSelf: 'flex-start',
                marginTop: 'auto',
              }}
              fontSize="medium"
            />
          ))}
      </CardContent>
    </Card>
  )
}

export default CardWithPhoto
