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
    created_at: data.created_at ? new Date(data.created_at) : null,
    updated_at: data.updated_at ? new Date(data.updated_at) : null,
    deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
  } as User)
}
