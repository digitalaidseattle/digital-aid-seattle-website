import Link from '@mui/material/Link'
import { LinkedIn } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { designColor } from 'theme/theme'

type CardWithPhotoProps = {
  title: string
  description: string
  image?: string
  fallbackImage?: string
  imageWidth?: number
  alt?: string
  subtitle?: string
  // undefined -> no LinkedIn icon; '' -> static icon (no link); url -> clickable icon
  linkedInUrl?: string
  // 'below' (default) keeps the icon at the card bottom; 'inline' places it beside the title
  linkedInPlacement?: 'below' | 'inline'
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
  fallbackImage,
  imageWidth = 196,
  alt = '',
  subtitle,
  linkedInUrl,
  linkedInPlacement = 'below',
  titleSx,
  subtitleSx,
  descriptionSx,
  mediaSx,
  onClick,
}: CardWithPhotoProps) => {
  const src = image || fallbackImage

  const linkedInIcon = linkedInUrl !== undefined &&
    (linkedInUrl ? (
      <Link
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        aria-label={`${title}'s LinkedIn profile, which opens in a new window.`}
        onClick={(e) => e.stopPropagation()}
        sx={
          linkedInPlacement === 'below'
            ? { alignSelf: 'flex-start', marginTop: 'auto', lineHeight: 0 }
            : { verticalAlign: 'middle' }
        }
      >
        <LinkedIn sx={{ color: designColor.linkedInBlue }} fontSize="medium" />
      </Link>
    ) : (
      <LinkedIn
        titleAccess={`${title} on LinkedIn`}
        sx={{
          color: designColor.linkedInBlue,
          ...(linkedInPlacement === 'below'
            ? { alignSelf: 'flex-start', marginTop: 'auto' }
            : { verticalAlign: 'middle' }),
        }}
        fontSize="medium"
      />
    ))

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
      {src &&
        <CardMedia
          sx={mediaSx ?? {
            minWidth: imageWidth,
            aspectRatio: '1/1',
          }}
          component="img"
          image={src}
          alt={alt}
          onError={(e) => {
            const img = e.currentTarget
            if (fallbackImage && !img.src.endsWith(fallbackImage)) img.src = fallbackImage
          }}
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
          {linkedInPlacement === 'inline' && linkedInIcon && (
            <>
              {' '}
              {linkedInIcon}
            </>
          )}
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
        {linkedInPlacement === 'below' && linkedInIcon}
      </CardContent>
    </Card>
  )
}

export default CardWithPhoto
