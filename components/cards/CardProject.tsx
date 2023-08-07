import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import StateBadge from './StateBadge'

type CardProjectProps = {
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: 'active' | 'recruiting' | 'complete'
  projectLink: string
  duration: { start: string; end: string }
  imageSrc: string
  imageAlt: string
}

const CardProject = ({
  title,
  partner,
  programAreas,
  description,
  status,
  projectLink,
  duration,
  imageSrc,
  imageAlt,
}: CardProjectProps) => {
  return (
    <Card>
      <CardContent
        sx={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Stack direction={{ xs: 'row', lg: 'column' }} gap="1.5rem">
          <CardMedia
            component="img"
            alt={imageAlt}
            image={imageSrc}
            sx={{
              width: { md: '7rem', lg: '100%' },
              aspectRatio: '1 / 1',
              border: '2px solid #EAF1F1',
              borderRadius: '8px',
              display: { xs: 'none', md: 'block' },
            }}
          />
          <Stack spacing="1rem">
            <Typography variant="titleLarge">{title}</Typography>
            <Typography variant="labelLarge">{partner}</Typography>
            <Typography variant="labelMedium">
              {programAreas.join(', ')}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="bodyMedium">{description}</Typography>
        <Stack
          direction={{ xs: 'column-reverse', lg: 'row' }}
          alignItems={{ xs: 'auto', lg: 'flex-end' }}
          justifyContent="space-between"
          spacing="1rem"
        >
          <Button
            variant="contained"
            href={projectLink}
            sx={{ width: { md: 'max-content' } }}
          >
            View Project
          </Button>
          <Stack
            direction={{ xs: 'row-reverse', lg: 'column' }}
            justifyContent={{ xs: 'space-between', sm: 'auto' }}
            alignItems={{ xs: 'center', sm: 'auto' }}
            spacing="1rem"
          >
            <StateBadge state={status} />
            <Typography variant="labelMedium">
              {duration.start} - {duration.end}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardProject
