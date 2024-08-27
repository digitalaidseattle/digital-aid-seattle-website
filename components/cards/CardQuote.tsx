/**
 * 
 * CardQuote.tsx
 * 
 * @2024 Digital Aid Seattle
*/

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Avatar } from '@mui/material'
import { Stack } from '@mui/system'

type CardQuoteProps = {
  title: string
  description: string
  avatar: string,
  person: string,
  role: string
}

const CardQuote = ({ title, description, avatar, person, role }: CardQuoteProps) => {
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
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'left',
          textAlign: 'left',
          padding: '2rem',
        }}
      >
        <Typography variant="h3">❝</Typography>
        <Typography variant="titleMedium">{title}</Typography>
        <Typography variant="bodySmall">{description}</Typography>
        <Stack direction={'row'} gap={'1rem'} sx={{ verticalAlign: 'center' }}>
          <Avatar alt="profile user"
            src={avatar}
            sx={{ width: 48, height: 48 }} />
          <Stack>
            <Typography variant="titleSmall">{person}</Typography>
            <Typography variant="bodySmall">{role}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardQuote
