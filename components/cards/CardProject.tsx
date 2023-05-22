import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import IconContainer from './IconContainer'
import { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// const placeholder = require('../../assets/placeholder-project-img.jpg')

type CardProjectProps = {
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: string
  buttonLink: string
//   startDate?: string
//   endDate?: string 
}

const CardProject = () => {
    return (
        <Card>
            <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                <Box sx={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1/1', // browser support for this is iffy
                    borderRadius: '8px',
                    backgroundColor: 'grey'
                }}>
                    {/* TODO: figure out images.. */}
                    {/* <img src='../../assets/placeholder-project-img.jpg'/> */}
                </Box>
                <Stack spacing={1}>
                    <Typography variant="titleLarge">Title</Typography>
                    <Typography variant="labelLarge">Partner</Typography>
                    <Typography variant="labelMedium">Program areas</Typography>
                </Stack>
                <Typography variant="bodyMedium">Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Button variant="contained">View Project</Button>
                    <Stack spacing={1} sx={{maxWidth: 'min-content'}}>
                        {/* TODO: replace this button with the state components */}
                        <Button variant="contained" color="secondary">Active</Button>
                        <Typography variant="labelMedium">Jun 1 - Jul 15</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CardProject;