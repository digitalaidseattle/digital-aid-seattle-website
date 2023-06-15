import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import StateButton from './StateButton'
import Placeholder from '../../assets/placeholder-img.png'

type CardProjectProps = {
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: 'active' | 'recruiting' | 'complete'
  projectLink: string
  duration: { start: string; end: string } // unsure how to handle dates at this point
}

const CardProject = ({
  title,
  partner,
  programAreas,
  description,
  status,
  projectLink,
  duration,
}: CardProjectProps) => {
  return (
  <Card>
    <CardContent
      sx={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Stack direction={{xs: "row", lg: "column"}} gap="1.5rem">
        <Box
          sx={{
            width: {md: '7rem', lg: '100%'},
            height: '0',
            border: '2px solid #EAF1F1',
            display: { xs: 'none', md: 'block' },
          }}>
          <img
            src={Placeholder.src}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: '8px',
            }}
          />
        </Box>
        <Stack spacing="1rem">
          <Typography variant="titleLarge">{title}</Typography>
          <Typography variant="labelLarge">{partner}</Typography>
          <Typography variant="labelMedium">
            {programAreas.join(', ')}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="bodyMedium">{description}</Typography>
      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        alignItems={{ xs: 'auto', sm: 'flex-end' }}
        justifyContent="space-between"
        spacing="1rem"
      >
        <Button variant="contained" href={projectLink}>
          View Project
        </Button>
        <Stack
          direction={{ xs: 'row-reverse', sm: 'column' }}
          justifyContent={{ xs: 'space-between', sm: 'auto' }}
          alignItems={{ xs: 'center', sm: 'auto' }}
          spacing="1rem"
          sx={{ paddingLeft: { xs: '2rem', sm: '0' } }}
        >
          <StateButton state={status} />
          <Typography variant="labelMedium">
            {duration.start} - {duration.end}
          </Typography>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
  )
}

export default CardProject
