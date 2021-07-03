import { EmailJSResponseStatus, send } from 'emailjs-com';
import environment from './environment';

interface SendEmailArguments {
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

  return send(serviceId, templateId, args, userId);
}
