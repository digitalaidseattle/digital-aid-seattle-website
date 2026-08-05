/**
 * donate.tsx
 * @2024 Digital Aid Seattle
 */
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  SxProps,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardQuote from 'components/cards/CardQuote'
import SectionContainer from 'components/layout/SectionContainer'
import {
  BlockComponent,
  LoadingContext,
  withBasicLayout,
} from 'components/layouts'
import { useRouter } from 'next/router'
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import PaypalImage from '../assets/paypal.png'
import DonateImage from '../assets/donate.png'
import VenmoImage from '../assets/venmo.png'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import IconButton from '@mui/material/IconButton'
import MastheadWithImage from 'components/MastheadWithImage'
import Slider from 'react-slick'
import { pageCopyService } from 'services/PageCopyService'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { DASTestimonial } from 'types'
import { urlForImage } from '../sanity/lib/image'
import { useFeature } from '../services/FeatureService'
import { testimonialService } from '../services/TestimonialService'

const LABELS = {
  HERO_TITLE: 'Donate',
  HERO_TXT:
    'Donate to Digital Aid Seattle and fuel our mission to uplift nonprofits with essential digital tools to support communities and create lasting change.',
  DONATE_TITLE: 'Donate now',
  DONATE_BTN: 'Download the check donation form',
  IMPACT_TITLE: 'What people say about us',
  DONATE_WITH: 'Donate with',
  DONATE_MONTHLY_WITH: 'Donate monthly with',
  MAILING_INSTRUCTIONS:
    "We're currently accepting your tax deductible donations by mail and directly through PayPal (monthly) and Venmo. You can mail the form and your check to us at the following address:",
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ''
const PAYPAL_DONATION_URL = process.env.NEXT_PUBLIC_PAYPAL_DONATION_URL ?? ''
const PAYPAL_RECURRING_DONATION_URL =
  process.env.NEXT_PUBLIC_PAYPAL_RECURRING_DONATION_URL ??
  PAYPAL_DONATION_URL
const VENMO_DONATION_URL =
  process.env.NEXT_PUBLIC_VENMO_DONATION_URL ?? 'https://venmo.com/DASeattle'

const openDonationLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const ADDRESS = {
  title: 'Digital Aid Seattle',
  street: '301 Union St',
  pobox: 'PO Box 1765',
  statezip: 'Seattle, WA 98111',
}

// Custom arrow components with chevrons
interface ArrowProps {
  ariaLabel?: string
  sx?: SxProps
  children?: React.ReactNode
  onClick?: () => void
}

const Arrow: React.FC<ArrowProps> = ({ ariaLabel, sx, children, onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: 'primary.main',
        bgcolor: 'background.paper',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          bgcolor: 'background.paper',
          opacity: 0.9,
        },
        width: { xs: 32, sm: 40 },
        height: { xs: 32, sm: 40 },
        ...sx,
      }}
      aria-label={ariaLabel}
    >
      {children}
    </IconButton>
  )
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Arrow
      sx={{ right: isMobile ? 'calc(50% - 180px)' : 'calc(50% - 480px)' }}
      ariaLabel='Next slide'
      onClick={onClick}>
      <ChevronRightIcon fontSize={isMobile ? 'small' : 'medium'} />
    </Arrow>
  )
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  return (
    <Arrow
      sx={{ left: isMobile ? 'calc(50% - 180px)' : 'calc(50% - 480px)' }}
      ariaLabel='Previous slide'
      onClick={onClick}>
      <ChevronLeftIcon fontSize={isMobile ? 'small' : 'medium'} />
    </Arrow>
  )
}

const DonateLayoutSection: React.FC<{ backgroundColor: string, children: ReactNode }> = ({ backgroundColor, children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  return (<SectionContainer backgroundColor={backgroundColor}>
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        textAlign: 'center',
      }}
      width={isMobile ? theme.breakpoints.values.sm : theme.breakpoints.values.lg}
      maxWidth={'880px'}
    >
      {children}
    </Stack>
  </SectionContainer>
  )
}

const WhatPeopleSaySection: React.FC<{ theme: any }> = ({ theme }) => {
  const { setLoading } = useContext(LoadingContext)
  const [testimonials, setTestimonials] = useState<DASTestimonial[]>([])

  useEffect(() => {
    setLoading(true)
    testimonialService
      .getActiveTestimonials()
      .then((data) =>
        setTestimonials(
          data.sort((a, b) => a.orderRank.localeCompare(b.orderRank))
        )
      )
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [setLoading])

  // Slider configuration with custom arrows and responsive settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <DonateLayoutSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.IMPACT_TITLE}
      </Typography>
      <Slider {...settings}>
        {testimonials.map((t, idx) => (
          <Box
            id={`testimonial-${idx}`}
            key={idx}
            sx={{
              padding: '2rem',
            }}
          >
            <CardQuote
              avatar={urlForImage(t.avatar).url()}
              title={t.title}
              description={t.quote}
              role={t.role}
              person={t.name}
            />
          </Box>
        ))}
      </Slider>
    </DonateLayoutSection >
  )
}

const DonatePage = () => {
  const theme = useTheme()
  const { data: supportUs } = useFeature('support-us')
  const router = useRouter()
  const [initialized, setInitialized] = useState<boolean>(false)
  const [isPayPalDialogOpen, setIsPayPalDialogOpen] = useState(false)
  const [donationFrequency, setDonationFrequency] = useState<'one-time' | 'monthly'>('monthly')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10)
  const [customAmount, setCustomAmount] = useState('')
  const [coverFees, setCoverFees] = useState(true)
  const [isPayPalSdkLoading, setIsPayPalSdkLoading] = useState(false)
  const [isPayPalSdkReady, setIsPayPalSdkReady] = useState(false)
  const [paypalError, setPaypalError] = useState('')
  const paypalButtonContainerRef = useRef<HTMLDivElement | null>(null)

  const donationAmounts = [10, 20, 25, 35, 50]
  const donationAmount = Number(customAmount) || selectedAmount || 0
  const totalDonationAmount = Number(
    Math.max(donationAmount, 10).toFixed(2)
  ) + (coverFees ? 1.88 : 0)
  const canContinue = donationAmount >= 10

  const buildPayPalDonationUrl = () => {
    const donationUrl = PAYPAL_RECURRING_DONATION_URL || PAYPAL_DONATION_URL

    if (!donationUrl) {
      return ''
    }

    let hostedButtonId = ''

    try {
      const parsedDonationUrl = new URL(donationUrl)
      hostedButtonId =
        parsedDonationUrl.searchParams.get('hosted_button_id') ??
        parsedDonationUrl.pathname.match(/\/ncp\/payment\/([^/?]+)/)?.[1] ??
        ''
    } catch {
      return ''
    }

    if (!hostedButtonId) {
      return ''
    }

    const normalizedAmount = Math.max(donationAmount, 10).toFixed(2)
    const params = new URLSearchParams({
      cmd: donationFrequency === 'monthly' ? '_xclick-subscriptions' : '_xclick',
      hosted_button_id: hostedButtonId,
      currency_code: 'USD',
      no_note: '1',
    })

    if (donationFrequency === 'monthly') {
      params.set('a3', normalizedAmount)
      params.set('p3', '1')
      params.set('t3', 'M')
      params.set('src', '1')
      params.set('sra', '1')
    } else {
      params.set('amount', normalizedAmount)
    }

    if (coverFees) {
      params.set('item_name', 'Donation with fee coverage')
    }

    return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`
  }

  const loadPayPalButtons = async () => {
    if (!PAYPAL_CLIENT_ID || typeof window === 'undefined') {
      return
    }

    setPaypalError('')
    setIsPayPalSdkLoading(true)

    if ((window as any).paypal?.Buttons) {
      setIsPayPalSdkReady(true)
      setIsPayPalSdkLoading(false)
      return
    }

    const existingScript = document.querySelector(
      `script[src*="https://www.paypal.com/sdk/js"]`
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        setIsPayPalSdkReady(true)
        setIsPayPalSdkLoading(false)
      })
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&components=buttons`
    script.async = true
    script.onload = () => {
      setIsPayPalSdkReady(true)
      setIsPayPalSdkLoading(false)
    }
    script.onerror = () => {
      setPaypalError('Unable to load PayPal checkout.')
      setIsPayPalSdkLoading(false)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!initialized) {
      pageCopyService
        .updateCopy(LABELS, 'support_us')
        .then(() => setInitialized(true))
    }
  }, [initialized])

  useEffect(() => {
    if (!isPayPalDialogOpen || !PAYPAL_CLIENT_ID) {
      return
    }

    loadPayPalButtons()
  }, [isPayPalDialogOpen])

  useEffect(() => {
    if (!isPayPalDialogOpen || !isPayPalSdkReady || !paypalButtonContainerRef.current) {
      return
    }

    const paypalButtons = (window as any).paypal?.Buttons

    if (!paypalButtons) {
      return
    }

    const buttons = paypalButtons({
      createOrder: async () => {
        const response = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Number(totalDonationAmount.toFixed(2)),
            currency: 'USD',
            donationLabel: 'Digital Aid Seattle donation',
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to create PayPal order.')
        }

        return data.orderId
      },
      onApprove: async (data: { orderID: string }) => {
        const captureResponse = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: data.orderID }),
        })

        const captureData = await captureResponse.json()

        if (!captureResponse.ok) {
          throw new Error(captureData.error ?? 'Unable to capture PayPal order.')
        }

        setIsPayPalDialogOpen(false)
        window.alert('Thank you for your donation to Digital Aid Seattle!')
      },
      onError: (error: unknown) => {
        setPaypalError(
          error instanceof Error
            ? error.message
            : 'Something went wrong while processing your PayPal donation.'
        )
      },
    })

    buttons.render(paypalButtonContainerRef.current)

    return () => {
      if (typeof buttons.close === 'function') {
        buttons.close()
      }
    }
  }, [isPayPalDialogOpen, isPayPalSdkReady, totalDonationAmount])

  useEffect(() => {
    if (supportUs !== undefined && supportUs === false) {
      console.error(`Support Us feature not implemented.`)
      router.push('/404')
    }
  }, [supportUs, router])

  const DonateHeroSection = () => {
    const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
    return (
      <MastheadWithImage
        imageSrc={DonateImage.src}
        imageText="Donate page graphic"
      >
        <>
          <Typography
            variant={extraSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            {LABELS.HERO_TITLE}
          </Typography>
          <Typography
            variant="bodyLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            {LABELS.HERO_TXT}
          </Typography>
        </>
      </MastheadWithImage>
    )
  }

  const DonateSection = ({ theme }) => (
    <DonateLayoutSection backgroundColor={theme.palette.background.white}>
      <Typography variant="headlineMedium" component="h2">
        {LABELS.DONATE_TITLE}
      </Typography>
      <Stack gap="2rem" textAlign="left">
        <Typography variant="bodyLarge">
          {LABELS.MAILING_INSTRUCTIONS}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {/* Mail Donation Box */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1 1 300px',
            maxWidth: '350px',
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <Stack gap="1rem" textAlign="left" sx={{ width: '100%' }}>
            <Typography variant="bodyLarge">
              {LABELS.MAILING_INSTRUCTIONS}
              <br />
              <br />
              {ADDRESS.title}
              <br />
              {ADDRESS.street}
              <br />
              {ADDRESS.pobox}
              <br />
              {ADDRESS.statezip}
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open('/donation-form.pdf', '_blank')}
            >
              {LABELS.DONATE_BTN}
            </Button>
          </Stack>
        </Box>
        {/* Paypal/Venmo Box */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1 1 300px',
            maxWidth: '350px',
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <Stack gap="1rem" textAlign="center" sx={{ width: '100%' }}>
            <Typography variant="bodyLarge">or donate through</Typography>
            <Button
              variant="outlined"
              onClick={() => openDonationLink(VENMO_DONATION_URL)}
              sx={{
                backgroundColor: '#FFFFFF',
              }}
              aria-label="Donate with Venmo"
            >
              {LABELS.DONATE_WITH}
              <img
                style={{ marginLeft: '1rem' }}
                src={VenmoImage.src}
                alt="Venmo wordmark"
                width="100px"
              />
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsPayPalDialogOpen(true)}
              sx={{
                backgroundColor: '#FFB02E',
              }}
              aria-label="Donate with PayPal"
            >
              {LABELS.DONATE_MONTHLY_WITH}
              <img
                style={{ marginLeft: '1rem' }}
                src={PaypalImage.src}
                alt="PayPal wordmark"
                width="95px"
              />
            </Button>
          </Stack>
        </Box>
      </Box>
    </DonateLayoutSection>
  )

  return (
    <>
      <BlockComponent block={false}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DonateHeroSection />
          <DonateSection theme={theme} />
          <WhatPeopleSaySection theme={theme} />
        </Container>
      </BlockComponent>

      <Dialog
        open={isPayPalDialogOpen}
        onClose={() => setIsPayPalDialogOpen(false)}
        aria-labelledby="paypal-donation-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="paypal-donation-dialog-title">Donate now</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ py: 1 }}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Frequency
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button
                  variant={donationFrequency === 'one-time' ? 'contained' : 'outlined'}
                  onClick={() => setDonationFrequency('one-time')}
                >
                  One Time
                </Button>
                <Button
                  variant={donationFrequency === 'monthly' ? 'contained' : 'outlined'}
                  onClick={() => setDonationFrequency('monthly')}
                >
                  Monthly
                </Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant="overline" color="text.secondary">
                {donationFrequency === 'monthly' ? 'Monthly amount' : 'One time amount'}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount && !customAmount ? 'contained' : 'outlined'}
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount('')
                    }}
                  >
                    {`$${amount}`}
                  </Button>
                ))}
              </Stack>
            </Box>

            <TextField
              label="Enter amount"
              type="number"
              value={customAmount}
              onChange={(event) => {
                setCustomAmount(event.target.value)
                setSelectedAmount(null)
              }}
              inputProps={{ min: 10, step: 1 }}
              helperText="$10 is the minimum online donation. All donations are tax deductible."
            />

            {PAYPAL_CLIENT_ID ? (
              <Box>
                <Typography variant="overline" color="text.secondary">
                  PayPal checkout
                </Typography>
                <Box
                  ref={paypalButtonContainerRef}
                  sx={{ minHeight: '56px', mt: 1 }}
                />
                {isPayPalSdkLoading && (
                  <Typography variant="body2" color="text.secondary">
                    Loading PayPal checkout...
                  </Typography>
                )}
                {paypalError && (
                  <Typography variant="body2" color="error.main">
                    {paypalError}
                  </Typography>
                )}
              </Box>
            ) : null}

            <Box>
              <Typography variant="overline" color="text.secondary">
                100+
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={coverFees}
                    onChange={(event) => setCoverFees(event.target.checked)}
                  />
                }
                label="Please add $1.88 to cover processing fees and other expenses associated with my donation."
              />
            </Box>

            <Typography variant="body2" color="text.secondary">
              Your donation helps Digital Aid Seattle expand access to digital tools and support community-led programs.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Empowering our community, one project at a time!
          </Typography>
          <Button
            onClick={() => {
              const donationUrl = buildPayPalDonationUrl()
              if (!donationUrl) {
                window.alert('Please configure NEXT_PUBLIC_PAYPAL_DONATION_URL or NEXT_PUBLIC_PAYPAL_RECURRING_DONATION_URL with a valid PayPal hosted button URL.')
                return
              }
              setIsPayPalDialogOpen(false)
              openDonationLink(donationUrl)
            }}
            variant="contained"
            disabled={!canContinue}
          >
            Continue to PayPal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withBasicLayout(DonatePage)
