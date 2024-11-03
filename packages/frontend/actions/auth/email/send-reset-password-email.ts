import client from '@/client'

export async function sendResetPasswordEmail(email: string) {
  const response = await client.email.reset.$post({
    json: { email },
  })
  return response.status
}
