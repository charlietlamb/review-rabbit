import {
  BaseProfile,
  OAuthProvider,
  OAuthTokens,
  AuthorizationParams,
} from '../types'

export interface SnapchatProfile extends BaseProfile {
  username: string
  displayName: string
  bitmoji?: {
    avatar: string
  }
}

export interface SnapchatOptions {
  clientId: string
  clientSecret: string
  scopes?: string[]
}

export function snapchat(
  options: SnapchatOptions
): OAuthProvider<SnapchatProfile> {
  return {
    async createAuthorizationURL(params: AuthorizationParams): Promise<URL> {
      const searchParams = new URLSearchParams({
        client_id: options.clientId,
        redirect_uri: params.redirectURI,
        response_type: 'code',
        scope: (
          options.scopes || [
            'snapchat-profile-api',
            'snapchat-marketing-api',
            'offline_access',
          ]
        ).join(' '),
        state: params.state,
      })

      return new URL(
        `https://accounts.snapchat.com/login/oauth2/authorize?${searchParams.toString()}`
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
        client_secret: options.clientSecret,
      })

      const response = await fetch(
        'https://accounts.snapchat.com/login/oauth2/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: searchParams.toString(),
        }
      )

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
        client_id: options.clientId,
        client_secret: options.clientSecret,
      })

      const response = await fetch(
        'https://accounts.snapchat.com/login/oauth2/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: searchParams.toString(),
        }
      )

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

    async getUserProfile(accessToken: string): Promise<SnapchatProfile> {
      const response = await fetch('https://kit.snapchat.com/v1/me', {
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
        email: '', // Snapchat API doesn't provide email by default
        name: data.data.displayName,
        picture: data.data.bitmoji?.avatar,
        username: data.data.username,
        displayName: data.data.displayName,
        bitmoji: data.data.bitmoji,
      }
    },
  }
}
