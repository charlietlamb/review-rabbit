import client from '@/client'

export async function getUserFromResetToken(token: string) {
  const user = await client.user['get-from-token']({ token })
  if (user.error) {
    console.error(user.error)
  }
  return user.data as User
}
