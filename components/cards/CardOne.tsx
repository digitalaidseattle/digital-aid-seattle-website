import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { designColor } from 'theme/theme'

import IconContainer from './IconContainer'
import { Box, CardActionArea, CardContent } from '@mui/material'

export const ICON_STYLE = {
  color: designColor.white,
  height: '100%',
  width: '100%',
}

type CardOneProps = {
  title?: string
  description: string
  bottomText?: string
  icon: ReactNode
  buttonText?: string
  buttonLink?: string
  smallerTitle?: boolean
  cardHref?: string
  cardStyles?: any
}

const CardOne = ({
  title,
  description,
  bottomText,
  icon,
  buttonText,
  buttonLink,
  smallerTitle,
  cardHref,
  cardStyles,
}: CardOneProps) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center',
        textAlign: 'center',
        // only do space-between when a button is used:
        justifyContent: buttonText && 'space-between',
        height: '100%',
      }}
    >
      <IconContainer>{icon}</IconContainer>
      {title && (
        <Typography variant={smallerTitle ? 'titleMedium' : 'titleLarge'}>
          {title}
        </Typography>
      )}
      <Typography variant="bodyMedium">{description}</Typography>
      {bottomText && (
        <Typography
          variant="labelLarge"
          sx={{ position: 'absolute', bottom: '2em' }}
        >
          {bottomText}
        </Typography>
      )}
      {buttonText && (
        <Button variant="contained" color="primary" href={buttonLink}>
          {buttonText}
        </Button>
      )}
    </Box>
  )

  return (
    <Card
      sx={{
        padding: { xs: '2rem', md: '1.5rem' },
        display: 'flex',
        flexGrow: '1',
        minWidth: { xs: '100%', sm: 'auto' },
        boxShadow: 'none',
        bgcolor: 'white',
        ...cardStyles,
      }}
    >
      {cardHref && <CardActionArea href={cardHref}>{content}</CardActionArea>}
      {!cardHref && <CardContent>{content}</CardContent>}
    </Card>
  )
}

export default CardOne
