import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import Placeholder from '../../assets/event-placeholder.png'

type CardEventProps = {
  title: string
  date: string
  time: {"start": string, "end": string}
  location: string
  description: string
  buttonLink: string
}

const CardEvent = () => {
    return (
        <Card>
            <CardContent sx={{padding: "2rem", paddingBottom: "2rem !important"}}>
                <Stack direction="row" spacing="1.5rem">
                    <Box sx={{
                        width: "20rem",
                        height: "20rem",
                        border: "2px solid #EAF1F1",
                        flexShrink: "0"
                    }}>
                        <img
                            src={Placeholder.src}
                            style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            }}
                        />
                    </Box>
                    <Stack spacing="1.5rem" justifyContent="center">
                        <Stack spacing="1rem">
                            <Typography variant="titleLarge">Earth-a-thon</Typography>
                            <Stack direction="row" spacing="1rem">
                                <Typography variant="labelLarge">March 27, 2023</Typography>
                                <Typography variant="labelLarge">6:00 - 8:00 PM</Typography>
                            </Stack>
                            <Typography variant="labelMedium">123 ABC Street, Seattle, WA</Typography>
                        </Stack>

                        <Typography variant="bodyMedium">Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</Typography>
                        <Button variant="contained" sx={{ maxWidth: "min-content" }}>RVSP</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CardEvent;