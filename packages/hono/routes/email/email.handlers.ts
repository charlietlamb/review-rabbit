import { AppRouteHandler } from '@ff/hono/lib/types'
import { HttpStatusCodes } from '@ff/http'
import { SendVerifyEmailRoute } from '@ff/hono/routes/email/email.routes'
import { db } from '@ff/database'
import { verifications } from '@ff/database/schema'
import { sendEmail } from '@ff/email'
import { getVerifyEmail } from '@ff/email'

export const sendVerifyEmail: AppRouteHandler<SendVerifyEmailRoute> = async (
  c
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 1 * 60 * 60)
  await db.insert(verifications).values({
    id: token,
    identifier: user.id,
    value: token,
    expiresAt,
  })
  const status = await sendEmail(
    user.email,
    'Verify your email',
    getVerifyEmail(user.name, token)
  )
  if (status !== HttpStatusCodes.OK) {
    return c.json(
      { error: 'Failed to send email' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}
