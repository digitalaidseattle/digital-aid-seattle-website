import CookieIcon from '@mui/icons-material/Cookie'
import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'

type CookieConsentBannerProps = {
  onAccept: () => void
  onReject: () => void
}

export const CookieConsentBanner = ({
  onAccept,
  onReject,
}: CookieConsentBannerProps) => (
  <Box
    component="aside"
    aria-label="Cookie preferences"
    sx={{
      position: 'fixed',
      zIndex: (theme) => theme.zIndex.modal,
      bottom: 0,
      left: 0,
      width: '100%',
      height: 'auto',
      maxHeight: '100dvh',
      overflowY: 'auto',
      bgcolor: '#FFFFFF',
      borderTop: '1px solid #B6C9C4',
      borderRadius: { xs: '20px 20px 0 0', md: '24px 24px 0 0' },
      boxShadow: '0 -8px 24px rgba(0, 33, 31, 0.16)',
      padding: { xs: '1rem', md: '1.5rem' },
    }}
  >
    <Stack gap={{ xs: '1rem', md: '1.5rem' }} width="100%">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        gap={{ xs: '1.5rem', md: '2rem' }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={{ xs: '1rem', md: '1.5rem' }}
        >
          <Box
            aria-hidden="true"
            sx={{
              alignItems: 'center',
              bgcolor: '#F2F7F7',
              borderRadius: '50%',
              color: 'primary.main',
              display: 'flex',
              flexShrink: 0,
              height: { xs: '56px', md: '64px' },
              justifyContent: 'center',
              width: { xs: '56px', md: '64px' },
            }}
          >
            <CookieIcon sx={{ fontSize: { xs: '28px', md: '32px' } }} />
          </Box>
          <Typography
            variant="headlineLarge"
            component="h2"
            sx={{ fontWeight: 420 }}
          >
            Your cookie choices
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row', md: 'row' }}
          gap={{ xs: '0.75rem', md: '1.25rem' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{
            mr: { md: '1rem' },
            transform: { md: 'translateY(6px)' },
          }}
        >
          <Button
            variant="outlined"
            onClick={onReject}
            sx={{
              bgcolor: '#FFFFFF',
              borderColor: '#7E9792',
              borderRadius: '999px',
              borderWidth: '2px',
              minHeight: '52px',
              minWidth: '180px',
              fontWeight: 750,
            }}
          >
            Reject optional
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onAccept}
            sx={{
              borderRadius: '999px',
              minHeight: '52px',
              minWidth: '180px',
              fontWeight: 750,
            }}
          >
            Accept optional
          </Button>
        </Stack>
      </Stack>
      <Typography variant="bodyLarge" maxWidth="640px" sx={{ lineHeight: 1.8 }}>
        We use essential cookies to keep this site working. With your
        permission, we also use analytics cookies to understand how visitors use
        the site and improve it.
      </Typography>
      <Divider sx={{ borderColor: '#D5E0DC' }} />
      <Link
        component={NextLink}
        href="/privacy"
        fontWeight={700}
        underline="always"
      >
        Cookie policy
      </Link>
    </Stack>
  </Box>
)
