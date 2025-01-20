import { EnvType } from '@rabbit/env'
import { getResend } from '@rabbit/email'
import { HttpStatusCodes } from '@rabbit/http'

export async function sendEmail(
  to: string[],
  subject: string,
  component: React.ReactElement,
  env: EnvType
) {
  const resend = getResend(env)
  const { data, error } = await resend.emails.send({
    from: `no-reply@reviewrabbit.uk`,
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
