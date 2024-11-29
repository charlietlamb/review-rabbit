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

const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/'
const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/'
const TIKTOK_USER_URL = 'https://open.tiktokapis.com/v2/user/info/'

// TikTok API v2 scopes
// https://developers.tiktok.com/doc/oauth-user-access-token-management
const SCOPES = [
  'user.info.basic',
  'user.info.profile',
  'user.info.stats',
  'video.list',
].join(',')

export function tiktok(options: TikTokOptions): OAuthProvider<TikTokProfile> {
  return {
    async createAuthorizationURL(params) {
      const url = new URL(TIKTOK_AUTH_URL)
      url.searchParams.set('client_key', options.clientId)
      url.searchParams.set('redirect_uri', params.redirectURI)
      url.searchParams.set('response_type', 'code')
      url.searchParams.set('scope', SCOPES)
      url.searchParams.set('state', params.state)

      return url
    },

    async validateAuthorizationCode(params): Promise<OAuthTokens> {
      const response = await fetch(TIKTOK_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
        },
        body: new URLSearchParams({
          client_key: options.clientId,
          client_secret: options.clientSecret,
          code: params.code,
          grant_type: 'authorization_code',
          redirect_uri: params.redirectURI,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new BetterAuthError(
          `TikTok token validation failed: ${response.status} - ${error}`
        )
      }

      const { data } = await response.json()

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_in
          ? new Date(Date.now() + data.expires_in * 1000)
          : undefined,
      }
    },

    async refreshTokens(refreshToken): Promise<OAuthTokens> {
      const response = await fetch(TIKTOK_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
        },
        body: new URLSearchParams({
          client_key: options.clientId,
          client_secret: options.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      })

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to refresh TikTok token: ${response.status}`
        )
      }

      const { data } = await response.json()

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_in
          ? new Date(Date.now() + data.expires_in * 1000)
          : undefined,
      }
    },

    async getUserProfile(accessToken): Promise<TikTokProfile> {
      const response = await fetch(TIKTOK_USER_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new BetterAuthError(
          `Failed to fetch TikTok user profile: ${response.status}`
        )
      }

      const { data } = await response.json()

      return {
        id: data.user.open_id,
        username: data.user.username,
        name: data.user.display_name,
        display_name: data.user.display_name,
        email: '', // TikTok doesn't provide email
        avatar_url: data.user.avatar_url,
        follower_count: data.user.follower_count,
        following_count: data.user.following_count,
        likes_count: data.user.likes_count,
        video_count: data.user.video_count,
      }
    },
  }
}
