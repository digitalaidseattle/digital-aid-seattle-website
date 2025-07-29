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
import { useEffect, useState } from 'react'

type CardQuoteProps = {
  title: string
  description: string
  avatar: string,
  person: string,
  role: string
}

const MAX_LENGTH = 300;

const CardQuote = ({ title, description, avatar, person, role }: CardQuoteProps) => {
  const [shorten, setShorten] = useState<boolean>(false)
  const [seeMore, setSeeMore] = useState<boolean>(false)

  useEffect(() => {
    if (description && description.length > MAX_LENGTH) {
      setShorten(true)
      setSeeMore(true)
    }
  }, [description]);

  function toggle() {
    setSeeMore(!seeMore)
  }

  return (
    <Card
      sx={{
        flex: '1',
        minWidth: { xs: '100%', sm: 'auto' },
        height: { xs: '100%' },
        width: { xs: '100%', sm: '250px', md: '400px' },
        minHeight: "400px",
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
          padding: '2rem'
        }}
      >
        <Stack direction={'row'} gap={'1rem'} sx={{ verticalAlign: 'center' }}>
          <Avatar alt="profile user"
            src={avatar}
            sx={{ width: 64, height: 64 }} />
          <Stack>
            <Typography variant="titleSmall">{person}</Typography>
            <Typography variant="bodySmall" color='gray'>{role}</Typography>
          </Stack>
        </Stack>
        <Typography variant="bodySmall">{seeMore ? description.slice(0, MAX_LENGTH) + '...' : description} </Typography>
        {shorten && <Typography variant="bodySmall"
          color='gray'
          sx={{ cursor: "pointer" }}
          onClick={toggle}>{seeMore ? "See more" : "See less"} </Typography>}
      </CardContent>
    </Card>
  )
}

export default CardQuote
