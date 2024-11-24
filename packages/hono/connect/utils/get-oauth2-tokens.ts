import { getDate } from './get-date'
import { OAuth2Tokens } from '../types'

export function getOAuth2Tokens(data: Record<string, any>): OAuth2Tokens {
  return {
    tokenType: data.token_type,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    accessTokenExpiresAt: data.expires_in
      ? getDate(data.expires_in, 'sec')
      : undefined,
    scopes: data?.scope
      ? typeof data.scope === 'string'
        ? data.scope.split(' ')
        : data.scope
      : [],
    idToken: data.id_token,
  }
}
