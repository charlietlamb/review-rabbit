import { AppRouteHandler } from '@dubble/hono/lib/types'
import { HttpStatusCodes } from '@dubble/http'
import { SendVerifyEmailRoute } from '@dubble/hono/routes/email/email.routes'
import { db } from '@dubble/database'
import { verifications } from '@dubble/database/schema'
import { sendEmail } from '@dubble/email'
import { getVerifyEmail } from '@dubble/email'

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
