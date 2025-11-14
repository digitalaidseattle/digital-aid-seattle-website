import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { DASNewsletter } from 'types'
import { urlForImage } from '../sanity/lib/image'
import CardWithPhoto from './cards/CardWithPhoto'

type NewsletterListProps = {
  newsletters: DASNewsletter[]
}

const NEWSLETTER_TITLE_STYLES: Record<string, any> = {
  height: '3em',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const NEWSLETTER_DESCRIPTION_STYLES: Record<string, any> = {
  height: '6em',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const NewsletterList = ({ newsletters }: NewsletterListProps) => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [sortedNewsletters, setSortedNewsletters] = useState<DASNewsletter[]>(
    []
  )

  const createDownloadHandler = (fileUrl: string) => {
    return () => {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

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
                      image={urlForImage(n.image).url()}
                      alt={n.title}
                      description={n.description}
                      subtitle={new Date(n.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      onClick={
                        n.fileUrl ? createDownloadHandler(n.fileUrl) : null
                      }
                      titleSx={NEWSLETTER_TITLE_STYLES}
                      descriptionSx={NEWSLETTER_DESCRIPTION_STYLES}
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
