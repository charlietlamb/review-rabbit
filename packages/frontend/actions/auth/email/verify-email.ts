import client from '@/client'

export async function verifyEmail(token: string) {
  const response = await client.email.verification.$post({
    json: { token },
  })
  return response.status
}
