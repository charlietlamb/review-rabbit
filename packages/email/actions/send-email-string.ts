import { getEnv } from '@rabbit/env'
import { Resend } from 'resend'
import { HttpStatusCodes } from '@rabbit/http'

const resend = new Resend(getEnv().RESEND_API_KEY)

export async function sendEmailString(
  to: string[],
  subject: string,
  content: string
) {
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
    return HttpStatusCodes.INTERNAL_SERVER_ERROR
  }
  return HttpStatusCodes.OK
}
