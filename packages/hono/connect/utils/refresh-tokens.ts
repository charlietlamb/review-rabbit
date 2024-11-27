import { OAuthTokens } from '../types'
import { BetterAuthError } from 'better-auth'

export async function refreshTokens(params: {
  refreshToken: string
  clientId: string
  clientSecret: string
  tokenEndpoint: string
}): Promise<OAuthTokens> {
  const response = await fetch(params.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: params.refreshToken,
      client_id: params.clientId,
      client_secret: params.clientSecret,
    }),
  })

  if (!response.ok) {
    throw new BetterAuthError(`Failed to refresh tokens: ${response.status}`)
  }

  const data = await response.json()

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? params.refreshToken,
    idToken: data.id_token,
    expiresAt: data.expires_in
      ? new Date(Date.now() + data.expires_in * 1000)
      : undefined,
  }
}
