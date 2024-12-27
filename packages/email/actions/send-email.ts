import { env } from '@burse/env'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

export async function sendEmail(
  to: string,
  subject: string,
  component: React.ReactElement
) {
  const { data, error } = await resend.emails.send({
    from: 'burse <no-reply@burse.xyz>',
    to: [to],
    subject: subject,
    react: component,
  })

  if (error) {
    console.error(error)
    throw new Error('Failed to send email')
  }
  return data
}
