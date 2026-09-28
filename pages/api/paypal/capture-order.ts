import type { NextApiRequest, NextApiResponse } from 'next'

const getPayPalBase = () => {
  const env = process.env.PAYPAL_ENV ?? 'sandbox'
  return env === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'
}

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !secret) {
    throw new Error('PayPal credentials not configured on server.')
  }

  const tokenUrl = `${getPayPalBase()}/v1/oauth2/token`
  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Unable to fetch PayPal access token: ${err}`)
  }

  const data = await res.json()
  return data.access_token
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const { orderId } = req.body

    if (!orderId) {
      return res.status(400).json({ error: 'Missing orderId' })
    }

    const accessToken = await getAccessToken()

    const captureUrl = `${getPayPalBase()}/v2/checkout/orders/${orderId}/capture`
    const captureRes = await fetch(captureUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const captureData = await captureRes.json()

    if (!captureRes.ok) {
      return res.status(500).json({ error: captureData })
    }

    return res.status(200).json({ capture: captureData })
  } catch (err: any) {
    console.error('capture-order error', err)
    return res.status(500).json({ error: err.message ?? String(err) })
  }
}

