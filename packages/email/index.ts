export { sendEmail } from './actions/send-email'
export { sendEmailString } from './actions/send-email-string'
export { getResetPasswordEmail } from './components/reset-password-email'
export { getVerifyEmail } from './components/verify-email'
import { Resend } from 'resend'

let resend: Resend | null = null

export function getResend(resendApiKey: string) {
  if (!resend) {
    resend = new Resend(resendApiKey)
  }
  return resend
}
