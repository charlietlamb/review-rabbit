import client from '@/client'

export async function updateUser(form: {
  name: string
  email: string
  image?: string
}): Promise<number> {
  const response = await client.user.update.$post({
    json: { form },
  })
  return response.status
}
