
/**
* newsletter.ts
* 
* serverless function to connect with Brevo
* 
* @2024 Digital Aid Seattle
*/

import { VercelRequest, VercelResponse } from '@vercel/node';
import Brevo, { ContactsApiApiKeys } from '@getbrevo/brevo';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('reaching handler:', req);
  if (req.method === 'POST') {
    const data = req.body; // Access the POST data

    // Process the data
    console.log('Received data:', data);
    console.log('Received data:', JSON.stringify(data));

    let contactsClient = new Brevo.ContactsApi();
    contactsClient.setApiKey(ContactsApiApiKeys.apiKey, process.env.NEXT_PUBLIC_BREVO_API_KEY!);

    const contact = new Brevo.CreateContact();
    contact.email = data.email;
    contact.listIds = data.listIds;
    const response = await contactsClient.createContact(contact)
    res.status(200).json({ message: 'Data posted successfully', data });
  } else {
    res.status(405).json({ error: `Method not allowed: ${req.method}` });
  }
}
