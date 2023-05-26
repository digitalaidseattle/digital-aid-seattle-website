import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import StateButton from './StateButton'
// const placeholder = require('../../assets/placeholder-project-img.jpg')

type CardProjectProps = {
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: "active" | "recruiting" | "complete"
  projectLink: string
  duration: {start: string, end: string} // unsure how to handle dates at this point
}

const CardProject = 
({title, partner, programAreas, description, status, projectLink, duration}: CardProjectProps) => {
    return (
        <Card>
            <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: {xs: '1rem', lg: '2rem'}}}>
                <Box sx={{
                    width: '100%',
                    paddingBottom: '100%',
                    height: '0',
                    border: '2px solid #EAF1F1', // move to theme.ts?
                    borderRadius: '8px',
                    backgroundColor: '#fff'
                }}>
                    {/* TODO: figure out images.. */}
                    {/* <img src='../../assets/placeholder-project-img.jpg'/> */}
                </Box>
                <Stack spacing="1rem">
                    <Typography variant="titleLarge">{title}</Typography>
                    <Typography variant="labelLarge">{partner}</Typography>
                    <Typography variant="labelMedium">{programAreas.join(', ')}</Typography>
                </Stack>
                <Typography variant="bodyMedium">{description}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Button variant="contained" href={projectLink}>View Project</Button>
                    <Stack spacing="1rem">
                        <StateButton state={status}/>
                        <Typography variant="labelMedium">{duration.start} - {duration.end}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CardProject;