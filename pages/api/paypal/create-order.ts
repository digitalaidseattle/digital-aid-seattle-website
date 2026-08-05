import { VercelRequest, VercelResponse } from '@vercel/node'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_SECRET = process.env.PAYPAL_SECRET
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL ?? 'https://api-m.paypal.com'

const getPayPalAccessToken = async () => {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
    throw new Error('PayPal client credentials are not configured.')
  }

  const basicAuth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`
  ).toString('base64')

  const tokenResponse = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error('Unable to authenticate with PayPal.')
  }

  const tokenData = await tokenResponse.json()
  return tokenData.access_token as string
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount = 10, currency = 'USD', donationLabel = 'Digital Aid Seattle donation' } = req.body ?? {}
    const numericAmount = Number(amount)

    if (!Number.isFinite(numericAmount) || numericAmount < 10) {
      return res.status(400).json({ error: 'A donation amount of at least $10 is required.' })
    }

    const accessToken = await getPayPalAccessToken()

    const orderResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: numericAmount.toFixed(2),
            },
            description: donationLabel,
            custom_id: 'digital-aid-seattle-donation',
          },
        ],
        application_context: {
          brand_name: 'Digital Aid Seattle',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          return_url: `${req.headers.origin ?? 'https://www.digitalaidseattle.org'}/donate`,
          cancel_url: `${req.headers.origin ?? 'https://www.digitalaidseattle.org'}/donate`,
        },
      }),
    })

    const orderData = await orderResponse.json()

    if (!orderResponse.ok) {
      return res.status(500).json({
        error: orderData?.error?.message ?? 'Unable to create PayPal order.',
      })
    }

    return res.status(200).json({
      orderId: orderData.id,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to create PayPal order.'
    return res.status(500).json({ error: message })
  }
}
