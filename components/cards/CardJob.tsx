import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'


type CardJobProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

const CardJob = ({
  title,
  description,
  imageSrc,
  imageAlt
}: CardJobProps) => {
  return (
    <Card
      sx={{
        flex: '1',
        minWidth: { xs: '100%', sm: '17rem' },
        boxShadow: '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)'
      }}
    >
        <CardMedia 
            sx={{ 
                minHeight: '17rem', 
                aspectRatio: '1/1',
                display: {xs: 'none', sm: 'block'}
            }}
            image={imageSrc}
            title={imageAlt}
        />
        <CardContent
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            padding: '1rem',
            }}
        >
            <Typography variant="titleMedium">{title}</Typography>
            <Typography variant="bodyMedium">{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardJob
