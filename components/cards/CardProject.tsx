/**
 * CardProject.tsx
 * 
 * @2024 Digital Aid Seattle
 */
import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DASProject } from 'types'

import { ProjectLabels } from 'components/ProjectComponents'
import ProjectImage from '../../assets/project-image.png'
import StateBadge from './StateBadge'

const PROJECT_IMAGE = ProjectImage.src;

type CardProjectProps = {
  project: DASProject
}

const CardProject = ({ project }: CardProjectProps) => {
  return (
    <Card
      sx={{
        boxShadow:
          '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)',
        '&:hover': {
          boxShadow:
            '0px 2px 4px 0px rgba(52, 61, 62, 0.1), 0px 4px 8px 2px rgba(52, 61, 62, 0.1)',
        },
      }}
    >
      <CardActionArea
        href={project.projectLink}
        sx={{
          height: '100%',
        }}
      >
        <CardContent
          sx={{
            padding: { xs: '2rem 1rem', lg: '2rem' },
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction={{ xs: 'row', lg: 'column' }} gap='1.5rem'>
            <CardMedia
              component='img'
              image={project.imageSrc ? project.imageSrc : PROJECT_IMAGE}
              alt={project.title + " logo"}
              sx={{
                objectFit: 'contain',
                width: { md: '7rem', lg: '100%' },
                aspectRatio: '1 / 1',
                borderRadius: '8px',
                display: { xs: 'none', md: 'block' },
                backgroundColor: 'white',
              }}
            />
            <Stack spacing='1rem' sx={{ width: '100%' }}>
              <Typography variant='titleLarge' component='h2'>
                {project.title}
              </Typography>
              <Stack spacing='1rem'>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  {project.programAreas &&
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography variant='labelLarge'>
                        {ProjectLabels.project_label + project.painpoint}
                      </Typography>
                    </Stack>
                  }
                  <StateBadge state={project.status} />
                </Stack>
                {project.programAreas &&
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='labelMedium'>
                      {project.programAreas.join(', ')}
                    </Typography>
                  </Stack>
                }
              </Stack>
            </Stack>
          </Stack>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '4',
              WebkitBoxOrient: 'vertical'
            }}
            variant='bodyMedium' >{project.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardProject
