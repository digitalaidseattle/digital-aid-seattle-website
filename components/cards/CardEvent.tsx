import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
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
            <Stack direction={{xs: "column", sm: "row"}} spacing={{xs: "0", sm: "1.5rem"}}>
                <Box sx={{
                    height: {xs: '0', sm: '20rem'},
                    width: {xs: '100%', sm: '20rem'},
                    paddingBottom: {xs: "100%", sm: '0'},
                    position: "relative",
                    border: "2px solid #EAF1F1",
                    borderRadius: "8px",
                    flexShrink: "0",
                    margin: {xs: "0", sm: "2rem 0 2rem 2rem"}
                }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={Placeholder.src}
                        sx={{ 
                            position: {xs:"absolute", sm: 'static'},
                            height: "100%"
                        }}
                    />
                </Box>
            <CardContent sx={{
                padding: {xs: "2rem 1rem 1rem 1rem", sm: "2rem 2rem 2rem 0"}, 
                paddingBottom: {xs: "1rem !important", sm:"2rem !important"} }}>
                    <Stack spacing="1.5rem" justifyContent="center" sx={{height: "100%"}}>
                        <Stack spacing="1rem">
                            <Typography variant="titleLarge">Earth-a-thon</Typography>
                            <Stack direction="row" spacing="1rem">
                                <Typography variant="labelLarge">March 27, 2023</Typography>
                                <Typography variant="labelLarge">6:00 - 8:00 PM</Typography>
                            </Stack>
                            <Typography variant="labelMedium">123 ABC Street, Seattle, WA</Typography>
                        </Stack>

                        <Typography variant="bodyMedium">Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</Typography>
                        <Button variant="contained" sx={{ maxWidth: {xs: "100%", sm: "min-content"} }}>RVSP</Button>
                    </Stack>
            </CardContent>
            </Stack>
        </Card>
    )
}

export default CardEvent;