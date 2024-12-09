/**
* EmailService.ts
* @2024 Digital Aid Seattle
*/

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

class EmailService {

    isValid(email: string): boolean {
        return email.match(EMAIL_REGEX) != null
    }

    async subscribe(email: string): Promise<boolean> {
        // Call API to subscribe
        return true
    }
}

const emailService = new EmailService();
export { emailService };
