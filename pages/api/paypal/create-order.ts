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
    const { amount, currency = 'USD', donationLabel } = req.body

    if (!amount) {
      return res.status(400).json({ error: 'Missing amount' })
    }

    const accessToken = await getAccessToken()

    const createUrl = `${getPayPalBase()}/v2/checkout/orders`
    const createRes = await fetch(createUrl, {
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
              value: Number(amount).toFixed(2),
            },
            description: donationLabel ?? 'Donation',
          },
        ],
      }),
    })

    const createData = await createRes.json()

    if (!createRes.ok) {
      return res.status(500).json({ error: createData })
    }

    return res.status(200).json({ orderId: createData.id })
  } catch (err: any) {
    console.error('create-order error', err)
    return res.status(500).json({ error: err.message ?? String(err) })
  }
}
