import {
  BaseProfile,
  OAuthProvider,
  OAuthTokens,
  ProviderOptions,
} from '../types'
import { BetterAuthError } from 'better-auth'

export interface InstagramProfile extends BaseProfile {
  id: string
  username: string
  account_type?: string
  media_count?: number
  profile_picture_url?: string
}

export type InstagramOptions = ProviderOptions

const INSTAGRAM_AUTH_URL = 'https://api.instagram.com/oauth/authorize'
const INSTAGRAM_TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
const INSTAGRAM_USER_URL = 'https://graph.instagram.com/me'

// Instagram Basic Display API permissions
// https://developers.facebook.com/docs/instagram-basic-display-api/overview#permissions
const SCOPES = ['user_profile', 'user_media'].join(' ')

export function instagram(
  options: InstagramOptions
): OAuthProvider<InstagramProfile> {
  // Helper function to exchange short-lived token for long-lived token
  async function exchangeForLongLivedToken(
    shortLivedToken: string
  ): Promise<OAuthTokens> {
    const url = new URL('https://graph.instagram.com/access_token')
    url.searchParams.set('grant_type', 'ig_exchange_token')
    url.searchParams.set('client_secret', options.clientSecret)
    url.searchParams.set('access_token', shortLivedToken)

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new BetterAuthError(
        `Failed to exchange for long-lived token: ${response.status}`
      )
    }

    const data = await response.json()
    const expiresIn = data.expires_in

    return {
      accessToken: data.access_token,
      expiresAt: expiresIn
        ? new Date(Date.now() + expiresIn * 1000)
        : undefined,
    }
  }

  return {
    async createAuthorizationURL(params) {
      const url = new URL(INSTAGRAM_AUTH_URL)
      url.searchParams.set('client_id', options.clientId)
      url.searchParams.set('redirect_uri', params.redirectURI)
      url.searchParams.set('response_type', 'code')
      url.searchParams.set('state', params.state)
      url.searchParams.set('scope', SCOPES)

      return url
    },

    async validateAuthorizationCode(params): Promise<OAuthTokens> {
      // Exchange code for short-lived access token
      const formData = new URLSearchParams()
      formData.append('client_id', options.clientId)
      formData.append('client_secret', options.clientSecret)
      formData.append('grant_type', 'authorization_code')
      formData.append('redirect_uri', params.redirectURI)
      formData.append('code', params.code)

      const response = await fetch(INSTAGRAM_TOKEN_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      if (!response.ok) {
        const error = await response.text()
        throw new BetterAuthError(
          `Instagram token validation failed: ${response.status} - ${error}`
        )
      }

      const data = await response.json()

      // Exchange short-lived token for long-lived token
      return exchangeForLongLivedToken(data.access_token)
    },

    async refreshTokens(refreshToken: string): Promise<OAuthTokens> {
      // For Instagram Basic Display API, we refresh using the access token
      const url = new URL('https://graph.instagram.com/refresh_access_token')
      url.searchParams.set('grant_type', 'ig_refresh_token')
      url.searchParams.set('access_token', refreshToken)

      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to refresh Instagram token: ${response.status}`
        )
      }

      const data = await response.json()
      const expiresIn = data.expires_in

      return {
        accessToken: data.access_token,
        expiresAt: expiresIn
          ? new Date(Date.now() + expiresIn * 1000)
          : undefined,
      }
    },

    async getUserProfile(accessToken): Promise<InstagramProfile> {
      // Get basic profile fields
      const fields = ['id', 'username', 'account_type', 'media_count'].join(',')
      const response = await fetch(
        `${INSTAGRAM_USER_URL}?fields=${fields}&access_token=${accessToken}`
      )

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to fetch Instagram user profile: ${response.status}`
        )
      }

      const profile = await response.json()

      return {
        id: profile.id,
        username: profile.username,
        name: profile.username, // Instagram Basic Display API doesn't provide full name
        email: '', // Instagram Basic Display API doesn't provide email
        account_type: profile.account_type,
        media_count: profile.media_count,
      }
    },
  }
}
