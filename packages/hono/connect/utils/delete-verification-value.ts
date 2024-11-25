import { db, verifications } from '@dubble/database'
import { eq } from 'drizzle-orm'

export async function deleteVerificationValue(identifier: string) {
  await db.delete(verifications).where(eq(verifications.identifier, identifier))
}
