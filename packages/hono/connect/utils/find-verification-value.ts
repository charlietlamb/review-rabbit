import { db, verifications } from '@dubble/database'
import { eq } from 'drizzle-orm'

export async function findVerificationValue(identifier: string) {
  const verification = await db.query.verifications.findFirst({
    where: eq(verifications.identifier, identifier),
  })
  return verification?.value
}
