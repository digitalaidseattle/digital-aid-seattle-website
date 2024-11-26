
// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.
// import Brevo from '@getbrevo/brevo';
// import { ContactsApiApiKeys } from '@getbrevo/brevo';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const data = req.body; // Access the POST data

    // Process the data
    console.log('Received data:', data);
    console.log('Received data stringify:', JSON.stringify(data));

    // let contactsClient = new Brevo.ContactsApi();
    // contactsClient.setApiKey(ContactsApiApiKeys.apiKey, process.env.NEXT_PUBLIC_BREVO_API_KEY!);

    // const contact = new Brevo.CreateContact();
    // contact.email = data.email;
    // contact.listIds = data.listIds;
    // const response = await contactsClient.createContact(contact)
    res.status(200).json({ message: 'Data posted successfully', data });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}