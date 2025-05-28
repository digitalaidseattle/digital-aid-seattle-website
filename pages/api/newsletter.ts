
/**
* newsletter.ts
* 
* serverless function to connect with Brevo
* 
* @2024 Digital Aid Seattle
*/

import { VercelRequest, VercelResponse } from '@vercel/node';
// const SibApiV3Sdk = require('sib-api-v3-sdk');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { email, attributes = {}, listIds = [] } = req.body;

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.NEXT_PUBLIC_BREVO_API_KEY!,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds, // Optional: Add to specific Brevo list(s)
        updateEnabled: true // Set true to update if contact exists
      }),
    });
    const data = await brevoResponse.json();

    if (brevoResponse.ok) {
      return res.status(200).json({ message: 'Data posted successfully', data });
    } else {
      return res.status(500).json({ error: data });
    }
  } else {
    res.status(405).json({ error: `Method not allowed: ${req.method}` });
  }
}

