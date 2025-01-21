import { AppRouteHandler } from '@rabbit/hono/lib/types'
import { HttpStatusCodes } from '@rabbit/http'
import { SendVerifyEmailRoute } from '@rabbit/hono/routes/email/email.routes'
import { getDb } from '@rabbit/database'
import { verifications } from '@rabbit/database/schema'
import { sendEmail } from '@rabbit/email'
import { getVerifyEmail } from '@rabbit/email'
import { AppBindings } from '@rabbit/hono/lib/types'
import { Context } from 'hono'

export const sendVerifyEmail: AppRouteHandler<SendVerifyEmailRoute> = async (
  c: Context<AppBindings>
) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const db = getDb(c.env)
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 1 * 60 * 60)
  await db.insert(verifications).values({
    id: token,
    identifier: user.id,
    value: token,
    expiresAt,
  })
  const status = await sendEmail(
    [user.email],
    'Verify your email',
    getVerifyEmail(user.name, token, c.env),
    c.env.RESEND_API_KEY
  )
  if (status !== HttpStatusCodes.OK) {
    return c.json(
      { error: 'Failed to send email' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}
