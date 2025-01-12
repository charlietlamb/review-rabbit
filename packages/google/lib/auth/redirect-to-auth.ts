import { getEnv } from '@rabbit/env'

export function redirectToAuth(returnUrl?: string): never {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams()
    if (returnUrl) {
      params.append('returnTo', returnUrl)
    }
    params.append('provider', 'google')
    window.location.href = `${getEnv().NEXT_PUBLIC_API}/api/auth/signin/google?${params.toString()}`
  }
  throw new Error('Redirecting to auth...')
}
