/**
* EmailService.ts
* @2024 Digital Aid Seattle
*/

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

class EmailService {

    isValid(email: string): boolean {
        return email.match(EMAIL_REGEX) != null
    }

    async subscribe(email: string): Promise<any> {
        fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                listIds: [2],
            }),
        })
            .then((response) => response.json())
    }
}

const emailService = new EmailService();
export { emailService };
