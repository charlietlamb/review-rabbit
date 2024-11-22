import client from '@dubble/design-system/lib/client'

export async function resetPassword(
  token: string,
  password: string
): Promise<number> {
  const response = await client.user['reset-password'].$post({
    json: { token, password },
  })
  return response.status
}