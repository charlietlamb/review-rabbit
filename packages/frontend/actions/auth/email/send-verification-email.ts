import client from '@/client'

export async function sendVerificationEmail({ session }: { session: string }) {
  const response = await client.auth.email.verify.$post({
    json: { session },
  })
  return response.status
}
