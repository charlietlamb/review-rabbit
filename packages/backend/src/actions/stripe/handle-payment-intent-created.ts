import { Plan } from '@/src/lib/types'
import getUserFromJwt from '@/src/actions/auth/get-user-from-jwt'
import { Context } from 'hono'
import { StatusCode } from 'hono/utils/http-status'
import { db } from '@/src/db/postgres'
import { users } from '@/src/db/schema/users'
import { eq } from 'drizzle-orm'

export default async function handlePaymentIntentCreated(
  c: Context,
  session: string,
  plan: Plan
) {
  const response = await getUserFromJwt(session, c)
  if ('error' in response) {
    return c.json(response.error, response.code as StatusCode)
  }
  await db
    .update(users)
    .set({
      plan: plan,
    })
    .where(eq(users.id, response.id))
}
