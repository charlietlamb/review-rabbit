import { getEnv } from '@rabbit/env'
import { Resend } from 'resend'
import { HttpStatusCodes } from '@rabbit/http'

const resend = new Resend(getEnv().RESEND_API_KEY)

export async function sendEmail(
  to: string[],
  subject: string,
  component: React.ReactElement
) {
  const { data, error } = await resend.emails.send({
    from: `review-rabbit <no-reply@${getEnv().NEXT_PUBLIC_DOMAIN}>`,
    to: to,
    subject: subject,
    react: component,
  })

  if (error) {
    console.error(error)
    throw new Error('Failed to send email')
  }
  if (!data) {
    return HttpStatusCodes.INTERNAL_SERVER_ERROR
  }
  return HttpStatusCodes.OK
}
