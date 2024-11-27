
/**
* newsletter.ts
* 
* serverless function to connect with Brevo
* 
* @2024 Digital Aid Seattle
*/

import { VercelRequest, VercelResponse } from '@vercel/node';
import SibApiV3Sdk from 'sib-api-v3-typescript';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    let contactsClient = new SibApiV3Sdk.ContactsApi();
    contactsClient.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, process.env.NEXT_PUBLIC_BREVO_API_KEY!);

    const contact = new SibApiV3Sdk.CreateContact();
    contact.email = req.body.email;
    contact.listIds = req.body.listIds;
    const response = await contactsClient.createContact(contact)
    res.status(200).json({ message: 'Data posted successfully', response });
  } else {
    res.status(405).json({ error: `Method not allowed: ${req.method}` });
  }
}

