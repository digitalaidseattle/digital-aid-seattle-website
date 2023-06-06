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
  time: {start: string, end: string}
  location: string
  description: string
  buttonLink: string
}

const CardEvent = ({title, date, time, location, description, buttonLink}: CardEventProps) => {
    return (
        <Card>
            <Stack direction={{xs: "column", sm: "row"}} spacing={{xs: "0", sm: "1.5rem"}}>
                <Box sx={{
                    position: "relative",
                    border: "2px solid #EAF1F1",
                    height: {xs: '0', sm: '20rem'},
                    width: {xs: '100%', sm: '20rem'},
                    paddingBottom: {xs: "100%", sm: '0'},
                    flexShrink: {xs: "0", sm: "1", md: "0"},
                    margin: {xs: "0", sm: "2rem 0 2rem 2rem"},
                    minWidth: {xs: "0", sm: "50%", md: "0"}
                }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={Placeholder.src}
                        sx={{ 
                            position: {xs:"absolute", sm: 'static'},
                            height: "100%",
                            borderRadius: "8px",
                        }}
                    />
                </Box>
            <CardContent sx={{
                padding: {xs: "2rem 1rem 1rem 1rem", sm: "2rem 2rem 2rem 0"}, 
                paddingBottom: {xs: "1rem !important", sm:"2rem !important"} }}>
                    <Stack spacing="1.5rem" justifyContent="center" sx={{height: "100%"}}>
                        <Stack spacing="1rem">
                            <Typography variant="titleLarge">{title}</Typography>
                            <Stack direction="row" spacing="1rem">
                                <Typography variant="labelLarge">{date}</Typography>
                                <Typography variant="labelLarge">{time.start} - {time.end}</Typography>
                            </Stack>
                            <Typography variant="labelMedium">{location}</Typography>
                        </Stack>

                        <Typography variant="bodyMedium">{description}</Typography>
                        <Button variant="contained" href={buttonLink} sx={{ maxWidth: {xs: "100%", sm: "min-content"} }}>RVSP</Button>
                    </Stack>
            </CardContent>
            </Stack>
        </Card>
    )
}

export default CardEvent;