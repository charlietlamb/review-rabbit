export { sendEmail } from './actions/send-email'
export { getResetPasswordEmail } from './components/reset-password-email'
export { getVerifyEmail } from './components/verify-email'
import { Resend } from 'resend'
import { EnvType } from '@rabbit/env'

let resend: Resend | null = null

export function getResend(env: EnvType) {
  if (!resend) {
    resend = new Resend(env.RESEND_API_KEY)
  }
  return resend
}
