import client from '@/client'
import { selectUserSchema } from '../../../../backend/src/db/schema'

export default async function getUserFromId(id: string): Promise<User | null> {
  const response = await client.user.get[':userId'].$get({
    param: { userId: id },
  })
  let data = await response.json()
  if ('error' in data) {
    return null
  }

  return selectUserSchema.parse({
    ...data,
    emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
  })
}
