// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.

import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const jsonData = req.body; // req.body is already parsed
    res.status(200).json({ parsedData: jsonData });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}