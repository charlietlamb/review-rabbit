import client from '@/client'

export async function updateUser(
  form: { name: string; email: string; image?: string },
  session: string
): Promise<number> {
  const response = await client.auth.user.update.$put({
    json: { form, session },
  })
  return response.status
}
