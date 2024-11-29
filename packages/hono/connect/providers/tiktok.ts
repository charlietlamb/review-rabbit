import {
  BaseProfile,
  OAuthProvider,
  OAuthTokens,
  ProviderOptions,
} from '../types'
import { BetterAuthError } from 'better-auth'

export interface TikTokProfile extends BaseProfile {
  id: string
  username: string
  display_name: string
  avatar_url?: string
  follower_count?: number
  following_count?: number
  likes_count?: number
  video_count?: number
}

export type TikTokOptions = ProviderOptions

const TIKTOK_AUTH_URL = 'https://www.tiktok.com/auth/authorize/'
const TIKTOK_TOKEN_URL = 'https://open-api.tiktok.com/oauth/access_token/'
const TIKTOK_USER_URL = 'https://open-api.tiktok.com/user/info/'

// TikTok API scopes
// https://developers.tiktok.com/doc/login-kit-web
const SCOPES = [
  'user.info.basic',
  'user.info.profile',
  'user.info.stats',
  'video.list',
].join(',') // TikTok uses comma separator

export function tiktok(options: TikTokOptions): OAuthProvider<TikTokProfile> {
  return {
    async createAuthorizationURL(params) {
      const url = new URL(TIKTOK_AUTH_URL)
      url.searchParams.set('client_key', options.clientId)
      url.searchParams.set('redirect_uri', params.redirectURI)
      url.searchParams.set('response_type', 'code')
      url.searchParams.set('state', params.state)
      url.searchParams.set('scope', SCOPES)

      return url
    },

    async validateAuthorizationCode(params): Promise<OAuthTokens> {
      const formData = new URLSearchParams()
      formData.append('client_key', options.clientId)
      formData.append('client_secret', options.clientSecret)
      formData.append('grant_type', 'authorization_code')
      formData.append('code', params.code)

      const response = await fetch(TIKTOK_TOKEN_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      if (!response.ok) {
        const error = await response.text()
        throw new BetterAuthError(
          `TikTok token validation failed: ${response.status} - ${error}`
        )
      }

      const data = await response.json()
      const {
        access_token,
        expires_in,
        open_id,
        refresh_token,
        refresh_expires_in,
      } = data.data

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_in
          ? new Date(Date.now() + expires_in * 1000)
          : undefined,
      }
    },

    async refreshTokens(refreshToken): Promise<OAuthTokens> {
      const formData = new URLSearchParams()
      formData.append('client_key', options.clientId)
      formData.append('client_secret', options.clientSecret)
      formData.append('grant_type', 'refresh_token')
      formData.append('refresh_token', refreshToken)

      const response = await fetch(
        'https://open-api.tiktok.com/oauth/refresh_token/',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to refresh TikTok token: ${response.status}`
        )
      }

      const data = await response.json()
      const { access_token, expires_in, refresh_token } = data.data

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_in
          ? new Date(Date.now() + expires_in * 1000)
          : undefined,
      }
    },

    async getUserProfile(accessToken): Promise<TikTokProfile> {
      const response = await fetch(TIKTOK_USER_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to fetch TikTok user profile: ${response.status}`
        )
      }

      const { data } = await response.json()
      const user = data.user

      return {
        id: user.open_id,
        username: user.union_id,
        name: user.display_name,
        email: '', // TikTok doesn't provide email
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        follower_count: user.follower_count,
        following_count: user.following_count,
        likes_count: user.likes_count,
        video_count: user.video_count,
      }
    },
  }
}
