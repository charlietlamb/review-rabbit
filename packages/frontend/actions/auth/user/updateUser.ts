import client from '@/client'

export async function updateUser(form: UpdateUser): Promise<number> {
  const response = await client.user.update.$put({
    json: form,
  })
  return response.status
}
