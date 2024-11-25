import { accounts } from '@dubble/database'

import { db } from '@dubble/database'

export async function createNewAccount(
  userId: string,
  accountId: string,
  providerId: string
) {
  await db.insert(accounts).values({
    userId,
    accountId,
    providerId,
  })
}
