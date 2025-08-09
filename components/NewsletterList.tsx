import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import CardWithPhoto from './cards/CardWithPhoto'
import { DASNewsletter } from 'types'

type NewsletterListProps = {
  newsletters: DASNewsletter[]
}

const NewsletterList = ({ newsletters }: NewsletterListProps) => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [sortedNewsletters, setSortedNewsletters] = useState<DASNewsletter[]>(
    []
  )

  useEffect(() => {
    const sorted = [...newsletters].sort((a, b) => {
      return sortOrder === 'newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    setSortedNewsletters(sorted)
  }, [newsletters, sortOrder])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="headlineMedium" component="h2" textAlign={'center'}>
        Past News Letters
      </Typography>
      <Box marginX={2} marginY={4}>
        {newsletters.length === 0 ? (
          <Typography
            variant="body1"
            textAlign="center"
            color="text.primary"
            sx={{ my: 4 }}
          >
            No newsletters available.
          </Typography>
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={4}
              mb={4}
            >
              <Button onClick={() => setSortOrder('newest')} variant="outlined">
                Newest First
              </Button>
              <Button onClick={() => setSortOrder('oldest')} variant="outlined">
                Oldest First
              </Button>
            </Box>

            <Box sx={{ pr: 0 }}>
              <Grid container spacing={4}>
                {sortedNewsletters.map((n) => (
                  <Grid item xs={12} md={6} key={n._id}>
                    <CardWithPhoto
                      title={n.title}
                      image={n.image}
                      alt={n.title}
                      description={n.description}
                      date={n.date}
                      descriptionLines={3}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Container>
  )
}

export default NewsletterList
