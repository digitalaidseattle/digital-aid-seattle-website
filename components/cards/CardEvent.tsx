import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
    const theme = useTheme();
    const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'));
    const smallScreen = useMediaQuery(theme.breakpoints.only('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    if (extraSmallScreen) {
        return (
            <Card>
            <Stack direction="column" spacing="0">
                <Box sx={{
                    position: "relative",
                    border: "2px solid #EAF1F1",
                    height: '0',
                    width: '100%',
                    paddingBottom: "100%",
                    flexShrink: "0",
                    margin: "0",
                    minWidth: "0"
                }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={Placeholder.src}
                        sx={{ 
                            position: "absolute",
                            height: "100%",
                            borderRadius: "8px",
                        }}
                    />
                </Box>
            <CardContent sx={{
                padding: "2rem 1rem 1rem 1rem", 
                paddingBottom: "1rem !important", }}>
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
                        <Button variant="contained" href={buttonLink} sx={{ maxWidth: "100%" }}>RVSP</Button>
                    </Stack>
            </CardContent> 
            </Stack>
        </Card>
        )
    } 
    else if (smallScreen) {
        return (
            <Card>

                <CardContent>
                    <Stack direction="row">
                        <Box sx={{
                                position: "relative",
                                border: "2px solid #EAF1F1",
                                height: '10rem',
                                width: '10rem',
                            }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    image={Placeholder.src}
                                    sx={{ 
                                        position: 'static',
                                        height: "100%",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>
                            <Stack spacing="1rem" justifyContent="center" sx={{marginLeft: "1.5rem"}}>
                                <Typography variant="titleLarge">{title}</Typography>
                                <Stack direction="row" spacing="1rem">
                                    <Typography variant="labelLarge">{date}</Typography>
                                    <Typography variant="labelLarge">{time.start} - {time.end}</Typography>
                                </Stack>
                                <Typography variant="labelMedium">{location}</Typography>
                            </Stack>
                    </Stack>
                    <Typography variant="bodyMedium" sx={{ display: "block", marginTop: "1rem !important" }}>{description}</Typography>
                    <Button variant="contained" href={buttonLink} sx={{ maxWidth: "min-content", display: "block", marginTop: "2rem" }}>RVSP</Button>
                </CardContent>
            </Card>
        )
    } 
    else { //mediumScreen +
        return (
            <Card>
                <Stack direction="row" spacing="1.5rem">
                    <Box sx={{
                        position: "relative",
                        border: "2px solid #EAF1F1",
                        height: '20rem',
                        width: '20rem',
                        paddingBottom: '0',
                        flexShrink: "0",
                        margin: "2rem 0 2rem 2rem",
                        minWidth: "0"
                    }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={Placeholder.src}
                            sx={{ 
                                position: 'static',
                                height: "100%",
                                borderRadius: "8px",
                            }}
                        />
                    </Box>
                <CardContent sx={{
                    padding: "2rem 2rem 2rem 0", 
                    paddingBottom: "2rem !important" }}>
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
                            <Button variant="contained" href={buttonLink} sx={{ maxWidth: "min-content" }}>RVSP</Button>
                        </Stack>
                </CardContent>
                </Stack>
            </Card>
        )
    } 
}

export default CardEvent;