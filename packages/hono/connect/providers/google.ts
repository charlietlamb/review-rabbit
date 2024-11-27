import { OAuthProvider } from '../types'
import { ProviderOptions } from '../types'
import { createAuthorizationURL } from '../utils/create-authorization-url'
import { validateAuthorizationCode } from '../utils/validate-authorization-code'
import { refreshTokens as refreshOAuthTokens } from '../utils/refresh-tokens'
import { BetterAuthError } from 'better-auth'

export interface GoogleProfile {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

interface BaseGoogleOptions {
  /**
   * Optional access type for Google OAuth
   * @default 'offline'
   */
  accessType?: 'online' | 'offline'
  /**
   * Optional prompt configuration
   * @default 'consent'
   */
  prompt?: 'none' | 'consent' | 'select_account'
}

export type GoogleOptions = ProviderOptions & BaseGoogleOptions

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

const DEFAULT_SCOPES = ['openid', 'profile', 'email']

export function google(options: GoogleOptions): OAuthProvider {
  const scopes = options.scopes
    ? [...DEFAULT_SCOPES, ...options.scopes]
    : DEFAULT_SCOPES

  return {
    async createAuthorizationURL(params) {
      const searchParams = {
        access_type: options.accessType ?? 'offline',
        prompt: options.prompt ?? 'consent',
      }

      return createAuthorizationURL({
        ...params,
        authorizationEndpoint: GOOGLE_AUTH_URL,
        clientId: options.clientId,
        scopes,
        ...searchParams,
      })
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

      const data = await response.json()
      return data as GoogleProfile
    },
  }
}
