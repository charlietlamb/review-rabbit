import { getResend } from '@rabbit/email'

export async function sendEmailString(
  to: string[],
  subject: string,
  content: string,
  resendApiKey: string
) {
  const resend = getResend(resendApiKey)
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
