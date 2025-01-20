import { getResend } from '@rabbit/email'
import { EnvType } from '@rabbit/env'

export async function sendEmailString(
  to: string[],
  subject: string,
  content: string,
  env: EnvType
) {
  const resend = getResend(env)
  const { data, error } = await resend.emails.send({
    from: `no-reply@reviewrabbit.uk`,
    to: to,
    subject: subject,
    text: content,
  })

  if (error) {
    console.error(error)
    throw new Error('Failed to send email')
  }
  if (!data) {
    return false
  }
  return true
}
