import {
  BaseProfile,
  OAuthProvider,
  OAuthTokens,
  AuthorizationParams,
} from '../types'

export interface XProfile extends BaseProfile {
  username: string
}

export interface XOptions {
  clientId: string
  clientSecret: string
  scopes?: string[]
}

export function x(options: XOptions): OAuthProvider<XProfile> {
  return {
    async createAuthorizationURL(params: AuthorizationParams): Promise<URL> {
      const searchParams = new URLSearchParams({
        response_type: 'code',
        client_id: options.clientId,
        redirect_uri: params.redirectURI,
        scope: (
          options.scopes || ['tweet.read', 'users.read', 'offline.access']
        ).join(' '),
        state: params.state,
        code_challenge_method: 'S256',
        code_challenge: params.state, // In production, generate proper PKCE challenge
      })

      return new URL(
        `https://api.x.com/2/oauth2/authorize?${searchParams.toString()}`
      )
    },

    async validateAuthorizationCode(params: {
      code: string
      state: string
      redirectURI: string
    }): Promise<OAuthTokens> {
      const searchParams = new URLSearchParams({
        grant_type: 'authorization_code',
        code: params.code,
        redirect_uri: params.redirectURI,
        client_id: options.clientId,
        code_verifier: params.state, // In production, use proper PKCE verifier
      })

      const response = await fetch('https://api.x.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${options.clientId}:${options.clientSecret}`
          ).toString('base64')}`,
        },
        body: searchParams.toString(),
      })

      if (!response.ok) {
        throw new Error('Failed to validate authorization code')
      }

      const data = await response.json()
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: new Date(Date.now() + data.expires_in * 1000),
      }
    },

    async refreshTokens(refreshToken: string): Promise<OAuthTokens> {
      const searchParams = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })

      const response = await fetch('https://api.x.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${options.clientId}:${options.clientSecret}`
          ).toString('base64')}`,
        },
        body: searchParams.toString(),
      })

      if (!response.ok) {
        throw new Error('Failed to refresh tokens')
      }

      const data = await response.json()
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: new Date(Date.now() + data.expires_in * 1000),
      }
    },

    async getUserProfile(accessToken: string): Promise<XProfile> {
      const response = await fetch('https://api.x.com/2/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to get user profile')
      }

      const data = await response.json()
      return {
        id: data.data.id,
        email: '', // X API doesn't provide email by default
        name: data.data.name,
        picture: data.data.profile_image_url,
        username: data.data.username,
      }
    },
  }
}
