import { EmailJSResponseStatus, send } from 'emailjs-com';
import { toError } from 'fp-ts/lib/Either';
import { TaskEither, tryCatch } from 'fp-ts/TaskEither';
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
export function sendEmail(args: SendEmailArguments): TaskEither<Error, EmailJSResponseStatus> {
  const { serviceId, templateId, userId } = environment.services.emailjs;

  return tryCatch(
    () => send(serviceId, templateId, args, userId),
    toError
  );
}
