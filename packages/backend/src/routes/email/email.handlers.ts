import { AppRouteHandler } from '@/src/lib/types'
import { HttpStatusCodes } from '@/src/http'
import {
  SendResetPasswordEmailRoute,
  SendVerifyEmailRoute,
  VerifyEmailRoute,
} from './email.routes'
import { db } from '@/src/db/postgres'
import { users, verifications } from '@/src/db/schema'
import { eq } from 'drizzle-orm'
import sendEmail from '@/src/actions/email/send-email'
import getVerifyEmail from '@/src/email/verify-email'
import resetPasswordEmail from '@/src/email/reset-password-email'

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

export const verifyEmail: AppRouteHandler<VerifyEmailRoute> = async (c) => {
  const json = await c.req.json()
  const token = json.token
  const verification = await db.query.verifications.findFirst({
    where: eq(verifications.value, token),
  })
  if (!verification) {
    return c.json({ error: 'Token not found' }, HttpStatusCodes.NOT_FOUND)
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, verification.identifier),
  })
  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }
  await db
    .update(users)
    .set({ emailVerified: true })
    .where(eq(users.id, user.id))

  await db.delete(verifications).where(eq(verifications.id, token))

  return c.json({ success: true }, HttpStatusCodes.OK)
}

export const sendResetPasswordEmail: AppRouteHandler<
  SendResetPasswordEmailRoute
> = async (c) => {
  const json = await c.req.json()
  const email = json.email
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  if (!user) {
    return c.json({ error: 'User not found' }, HttpStatusCodes.NOT_FOUND)
  }
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 1 * 60 * 60)
  await db.insert(resets).values({
    id: token,
    userId: user.id,
    value: token,
    expiresAt,
  })
  const status = await sendEmail(
    user.email,
    'Reset your password',
    resetPasswordEmail(user, token)
  )
  if (status !== HttpStatusCodes.OK) {
    return c.json(
      { error: 'Failed to send email' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  return c.json({ success: true }, HttpStatusCodes.OK)
}
