import type { SendEmailCommandInput } from '@aws-sdk/client-ses'
import { render } from '@react-email/components'
import { SES } from '@aws-sdk/client-ses'
import env from '../../env'

export default async function sendEmail(
  to: string,
  subject: string,
  component: React.ReactElement
) {
  const ses = new SES({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const emailHtml = await render(component)

  const params: SendEmailCommandInput = {
    Source: 'no-reply@postpad.dev',
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  }
  const response = await ses.sendEmail(params)
  return response.$metadata.httpStatusCode
}
