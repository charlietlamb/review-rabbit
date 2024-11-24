import { env } from '@dubble/env'

export default function connectGoogle(redirect: (url: string) => void) {
  const redirectUri = `${env.NEXT_PUBLIC_API}/connect/google`
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&client_id=${
    env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  }&scope=https://www.googleapis.com/auth/youtube`
  redirect(googleAuthUrl)
}
