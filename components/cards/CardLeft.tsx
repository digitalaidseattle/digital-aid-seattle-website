import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import IconContainer from './IconContainer'
import { ReactNode } from 'react'
import Button from '@mui/material/Button'

type CardLeftProps = {
  title: string
  description: string
  icon: ReactNode
}

const CardLeft = ({
  title,
  description,
  icon,
}: CardLeftProps) => {
  return (
    <Card
      sx={{
        flex: '1',
        minWidth: { xs: '100%', sm: 'min-content' },
        boxShadow:
          '0px 12px 24px rgba(86, 96, 97, 0.12), 0px 6px 12px rgba(86, 96, 97, 0.12)',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'flex-start',
          textAlign: 'left',
          padding: '2rem',
        }}
      >
        <IconContainer>{icon}</IconContainer>
        <Typography variant="titleMedium">{title}</Typography>
        <Typography variant="bodyMedium">{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardLeft
