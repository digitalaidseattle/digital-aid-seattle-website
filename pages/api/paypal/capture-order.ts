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
    const { orderId } = req.body ?? {}

    if (!orderId) {
      return res.status(400).json({ error: 'Missing PayPal order id.' })
    }

    const accessToken = await getPayPalAccessToken()

    const captureResponse = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const captureData = await captureResponse.json()

    if (!captureResponse.ok) {
      return res.status(500).json({
        error: captureData?.error?.message ?? 'Unable to capture PayPal order.',
      })
    }

    return res.status(200).json({
      captured: true,
      data: captureData,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to capture PayPal order.'
    return res.status(500).json({ error: message })
  }
}
