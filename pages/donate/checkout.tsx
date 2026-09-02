import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material'
import PaypalImage from '../../assets/paypal.png'

const presetAmounts = [10, 25, 50]

const CheckoutPage: React.FC = () => {
  const router = useRouter()
  const { query } = router

  const initialAmount = Number(query.amount) || 0
  const initialFrequency = (query.frequency as string) || 'one-time'
  const initialCover = query.coverFees === '1'

  const [amount, setAmount] = useState<number>(initialAmount)
  const initialSelectedAmount = presetAmounts.includes(initialAmount) ? String(initialAmount) : 'custom'
  const [selectedAmount, setSelectedAmount] = useState<string>(initialSelectedAmount)
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>(
    initialFrequency === 'monthly' ? 'monthly' : 'one-time'
  )
  const [coverFees, setCoverFees] = useState<boolean>(initialCover)
  const paypalButtonContainerRef = useRef<HTMLDivElement | null>(null)
  const [isPayPalSdkLoading, setIsPayPalSdkLoading] = useState(false)
  const [isPayPalSdkReady, setIsPayPalSdkReady] = useState(false)
  const [paypalError, setPaypalError] = useState('')

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ''

  const loadPayPalButtons = async () => {
    if (!PAYPAL_CLIENT_ID || typeof window === 'undefined') return
    setPaypalError('')
    setIsPayPalSdkLoading(true)

    if ((window as any).paypal?.Buttons) {
      setIsPayPalSdkReady(true)
      setIsPayPalSdkLoading(false)
      return
    }

    const existing = document.querySelector(`script[src*="https://www.paypal.com/sdk/js"]`)
    if (existing) {
      existing.addEventListener('load', () => {
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
    if (!PAYPAL_CLIENT_ID) return
    loadPayPalButtons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PAYPAL_CLIENT_ID])

  useEffect(() => {
    if (!isPayPalSdkReady || !paypalButtonContainerRef.current) return

    const paypalButtons = (window as any).paypal?.Buttons
    if (!paypalButtons) return

    const total = Number(amount) + (coverFees ? 1.88 : 0)

    const buttons = paypalButtons({
      createOrder: async () => {
        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total, currency: 'USD', donationLabel: 'Digital Aid Seattle donation' }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Unable to create order')
        return data.orderId
      },
      onApprove: async (data: any) => {
        const captureRes = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: data.orderID }),
        })
        const captureData = await captureRes.json()
        if (!captureRes.ok) throw new Error(captureData.error ?? 'Unable to capture')
        alert('Thank you for your donation!')
        router.push('/')
      },
      onError: (err: any) => setPaypalError(err?.message || 'PayPal error'),
    })

    buttons.render(paypalButtonContainerRef.current)

    return () => { if (typeof buttons.close === 'function') buttons.close() }
  }, [isPayPalSdkReady, amount, coverFees, router])

  useEffect(() => {
    // keep state in sync if user comes with query params
    setAmount(initialAmount)
    setFrequency(initialFrequency === 'monthly' ? 'monthly' : 'one-time')
    setSelectedAmount(presetAmounts.includes(initialAmount) ? String(initialAmount) : 'custom')
    setCoverFees(initialCover)
  }, [query.amount, query.frequency, query.coverFees])

  const total = (amount + (coverFees ? 1.88 : 0)).toFixed(2)

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Digital Aid Seattle Donation
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
       
        <Box sx={{ flex: 2, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="subtitle2">Order summary</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Donation Amount
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overline
          </Typography>
         <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Frequency</Typography>
              <RadioGroup
                row
                value={frequency}
                onChange={(e) => setFrequency(e.target.value === 'monthly' ? 'monthly' : 'one-time')}
              >
                <FormControlLabel value="one-time" control={<Radio />} label="Once" />
                <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
              </RadioGroup>
            </FormControl>
            <Typography variant="caption" color="text.secondary">You can cancel anytime.</Typography>
        </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Choose an amount</Typography>
              <RadioGroup
                row
                value={selectedAmount}
                onChange={(e) => {
                  const v = e.target.value
                  setSelectedAmount(v)
                  if (v === 'custom') return
                  setAmount(Number(v))
                }}
              >
                {presetAmounts.map((a) => (
                  <FormControlLabel
                    key={a}
                    value={String(a)}
                    control={<Radio />}
                    label={`$${a}`}
                  />
                ))}
                <FormControlLabel value="custom" control={<Radio />} label="Custom" />
              </RadioGroup>
            </FormControl>
            {(selectedAmount === 'custom' || (amount > 0 && !presetAmounts.includes(amount))) && (
              <Box sx={{ mt: 2 }}>
                <TextField

                  type="number"
                  value={amount === 0 ? '' : amount}
                  onChange={(e) => setAmount(Number(e.target.value || 0))}
                  sx={{ width: 140 }}
                  inputProps={{ min: 0 }}
                  autoFocus
                />
              </Box>
            )}
          </Box>

          


          <Divider sx={{ my: 3 }} />

          <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Pay with PayPal</Typography>
              {PAYPAL_CLIENT_ID ? (
                <>
                  <Box ref={paypalButtonContainerRef} sx={{ mt: 1, minHeight: 42 }} />
                  {isPayPalSdkLoading && <Typography variant="body2">Loading PayPal...</Typography>}
                  {paypalError && <Typography variant="body2" color="error.main">{paypalError}</Typography>}
                </>
              ) : (
                <>
                </>
              )}
            </Box>
          </Stack>

        </Box>

        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            minWidth: 320,
            maxWidth: 380,
            ml: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">Order summary</Typography>
            <Typography variant="body2">{frequency === 'monthly' ? 'Monthly' : 'Once'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Total
            </Typography>
            <Typography variant="h6">${total} USD</Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
              Express checkout options
            </Typography>

            <Button
              fullWidth
              sx={{
                bgcolor: '#FFC439',
                color: 'black',
                py: 1.5,
                fontWeight: 700,
                '&:hover': { bgcolor: '#f2b800' },
              }}
              onClick={() => alert('PayPal express checkout (server flow)')}
              startIcon={<img src={PaypalImage.src} alt="PayPal" style={{ height: 18 }} />}
            >
              PayPal
            </Button>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button fullWidth sx={{ bgcolor: '#009fe3', color: 'white', py: 1 }} onClick={() => alert('Venmo')}>
                Venmo
              </Button>
              <Button
                fullWidth
                sx={{ bgcolor: 'black', color: 'white', py: 1 }}
                onClick={() => alert('Apple Pay')}
                startIcon={<Box component="span" sx={{ fontSize: 18 }}></Box>}
              >
                Pay
              </Button>
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
              <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
              <Typography variant="caption" color="text.secondary">or pay with card</Typography>
              <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
            </Box>

            <Button fullWidth sx={{ bgcolor: '#222', color: 'white', py: 1.5 }} onClick={() => alert('Card payment placeholder')}>
              Debit or Credit Card
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              This product is offered and sold by the seller and is subject to their policies. Item
              descriptions, pictures, and info are provided by the seller and not verified or
              guaranteed by PayPal.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 1, justifyContent: 'center' }}>
              <Button variant="text" size="small">Report this link</Button>
              <Button variant="text" size="small">Privacy</Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
              Powered by PayPal
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  )
}

export default CheckoutPage
