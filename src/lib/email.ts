import type { EmailJSResponseStatus } from 'emailjs-com';
import environment from './environment';

interface SendEmailArguments extends Record<string, unknown> {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends an email through emailjs.
 * @param args The email to send.
 */
export function sendEmail(args: SendEmailArguments): Promise<EmailJSResponseStatus> {
  const { serviceId, templateId, userId } = environment.services.emailjs;

  // Importing at the file level causes issues with SSR 🤔
  return import('emailjs-com')
    .then((module) => module.send(serviceId, templateId, args, userId))
}
