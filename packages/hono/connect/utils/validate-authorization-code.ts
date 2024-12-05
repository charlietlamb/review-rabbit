import { OAuthTokens } from '../types'

export async function validateAuthorizationCode(params: {
  code: string
  state: string
  redirectURI: string
  clientId: string
  clientSecret: string
  tokenEndpoint: string
}): Promise<OAuthTokens> {
  try {
    const response = await fetch(params.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: params.code,
        client_id: params.clientId,
        client_secret: params.clientSecret,
        redirect_uri: params.redirectURI,
      }).toString(),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Token endpoint error:', data)
      throw new Error(
        `Token endpoint error: ${data.error || response.statusText}`
      )
    }

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      idToken: data.id_token,
      expiresAt: data.expires_in
        ? new Date(Date.now() + data.expires_in * 1000)
        : undefined,
    }
  } catch (error) {
    console.error('Token validation error:', error)
    throw error instanceof Error
      ? error
      : new Error(
          `Failed to validate code: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
  }
}
