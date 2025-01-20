import { Account } from '@rabbit/database'
import { GOOGLE_BUSINESS_SCOPE } from '../data'
import { EnvType } from '@rabbit/env'

export async function addBusinessScope(
  account: Account,
  env: EnvType
): Promise<Account> {
  const params = new URLSearchParams({
    client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: `${env.NEXT_PUBLIC_API}/business/callback/success`,
    response_type: 'code',
    scope: GOOGLE_BUSINESS_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    login_hint: account.providerId,
    state: account.id,
  })

  if (typeof window !== 'undefined') {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    throw new Error('Redirecting to Google Auth for additional scopes...')
  }

  throw new Error('Cannot request additional scopes in server environment')
}
