import { BaseProfile, OAuthProvider, ProviderOptions } from '../types'
import { validateAuthorizationCode } from '../utils/validate-authorization-code'
import { refreshTokens as refreshOAuthTokens } from '../utils/refresh-tokens'
import { BetterAuthError } from 'better-auth'

export interface InstagramProfile extends BaseProfile {
  id: string
  username: string
  account_type: string
  media_count: number
  profile_picture_url: string
}

export type InstagramOptions = ProviderOptions

const INSTAGRAM_AUTH_URL = 'https://api.instagram.com/oauth/authorize'
const INSTAGRAM_TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
const INSTAGRAM_GRAPH_URL = 'https://graph.instagram.com/v18.0'

// Instagram Basic Display API permissions
// https://developers.facebook.com/docs/instagram-basic-display-api/overview#permissions
const SCOPES = ['user_profile', 'user_media'].join(' ')

export function instagram(
  options: InstagramOptions
): OAuthProvider<InstagramProfile> {
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

    async validateAuthorizationCode(params) {
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
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      }
    },

    async refreshTokens(refreshToken) {
      try {
        return await refreshOAuthTokens({
          refreshToken,
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          tokenEndpoint: INSTAGRAM_TOKEN_URL,
        })
      } catch (error) {
        throw new BetterAuthError(
          `Failed to refresh Instagram tokens: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    },

    async getUserProfile(accessToken): Promise<InstagramProfile> {
      // Get basic profile
      const response = await fetch(
        `${INSTAGRAM_GRAPH_URL}/me?fields=id,username,account_type,media_count&access_token=${accessToken}`
      )

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to fetch Instagram user profile: ${response.status}`
        )
      }

      const profile = await response.json()

      // Get profile picture URL in a separate call
      const mediaResponse = await fetch(
        `${INSTAGRAM_GRAPH_URL}/me/media?fields=media_url&access_token=${accessToken}`
      )

      let profilePictureUrl = null
      if (mediaResponse.ok) {
        const mediaData = await mediaResponse.json()
        if (mediaData.data?.[0]?.media_url) {
          profilePictureUrl = mediaData.data[0].media_url
        }
      }

      return {
        id: profile.id,
        username: profile.username,
        name: profile.username,
        email: '', // Instagram doesn't provide email
        account_type: profile.account_type,
        media_count: profile.media_count,
        profile_picture_url: profilePictureUrl,
      }
    },
  }
}
