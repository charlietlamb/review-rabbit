import { BaseProfile, OAuthProvider, ProviderOptions } from '../types'
import { validateAuthorizationCode } from '../utils/validate-authorization-code'
import { refreshTokens as refreshOAuthTokens } from '../utils/refresh-tokens'
import { BetterAuthError } from 'better-auth'

export interface GoogleProfile extends BaseProfile {
  sub: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
  channelName?: string
}

export type GoogleOptions = ProviderOptions

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
const YOUTUBE_CHANNEL_URL = 'https://www.googleapis.com/youtube/v3/channels'

// More granular scopes for specific YouTube features
const SCOPES = [
  'openid',
  'profile',
  'email',
  'https://www.googleapis.com/auth/youtube.upload', // Upload videos
  'https://www.googleapis.com/auth/youtube.force-ssl', // Secure access to YouTube data
  'https://www.googleapis.com/auth/youtubepartner', // Content management
].join(' ')

export function google(options: GoogleOptions): OAuthProvider<GoogleProfile> {
  return {
    async createAuthorizationURL(params) {
      const url = new URL(GOOGLE_AUTH_URL)
      url.searchParams.set('client_id', options.clientId)
      url.searchParams.set('redirect_uri', params.redirectURI)
      url.searchParams.set('response_type', 'code')
      url.searchParams.set('state', params.state)
      url.searchParams.set('scope', SCOPES)
      url.searchParams.set('access_type', 'offline') // Get refresh token
      url.searchParams.set('prompt', 'consent') // Always show consent screen

      return url
    },

    async validateAuthorizationCode(params) {
      try {
        return await validateAuthorizationCode({
          ...params,
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          tokenEndpoint: GOOGLE_TOKEN_URL,
        })
      } catch (error) {
        throw new BetterAuthError(
          `Failed to validate Google authorization code: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    },

    async refreshTokens(refreshToken) {
      try {
        return await refreshOAuthTokens({
          refreshToken,
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          tokenEndpoint: GOOGLE_TOKEN_URL,
        })
      } catch (error) {
        throw new BetterAuthError(
          `Failed to refresh Google tokens: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    },

    async getUserProfile(accessToken): Promise<GoogleProfile> {
      const response = await fetch(GOOGLE_USERINFO_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to fetch Google user profile: ${response.status}`
        )
      }

      const profile = await response.json()

      const channelResponse = await fetch(
        `${YOUTUBE_CHANNEL_URL}?part=snippet&mine=true`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (channelResponse.ok) {
        const channelData = await channelResponse.json()
        if (channelData.items?.[0]?.snippet?.title) {
          profile.channelName = channelData.items[0].snippet.title
        }
      }

      return {
        ...profile,
        id: profile.sub,
        username: profile.channelName || profile.given_name || null,
      } as GoogleProfile
    },
  }
}
