import { AppRouteHandler } from '@/src/lib/types'
import { HttpStatusCodes } from '@/src/http'
import { SendVerifyEmailRoute } from './email.routes'
import { db } from '@/src/db/postgres'
import { verifications } from '@/src/db/schema'
import sendEmail from '@/src/actions/email/send-email'
import getVerifyEmail from '@/src/email/verify-email'

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
    getVerifyEmail(user, token)
  )
  if (status !== HttpStatusCodes.OK) {
    return c.json(
      { error: 'Failed to send email' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}
