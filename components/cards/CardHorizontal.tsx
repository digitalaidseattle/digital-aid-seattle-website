/*
 * CardHorizontal.tsx
 * @2025 Digital Aid Seattle
 */
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

import IconContainer from './IconContainer'
import { Box, Stack } from '@mui/material'

type CardHorizontalProps = {
  title: string
  description: string
  icon: ReactNode
}

const CardHorizontal = ({ title, description, icon }: CardHorizontalProps) => {
  return (
    <Card
      sx={{
        flex: '1',
        minWidth: { xs: '100%', sm: 'auto' },
        boxShadow:
          '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem',
          alignItems: 'top',
          textAlign: 'left',
          padding: '2rem',
        }}
      >
        <Box>
          <IconContainer>{icon}</IconContainer>
        </Box>
        <Stack gap={2}>
          <Typography variant="titleMedium">{title}</Typography>
          <Typography variant="bodyMedium">{description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardHorizontal
