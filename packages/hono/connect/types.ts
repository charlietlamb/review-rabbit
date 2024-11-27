export interface OAuthTokens {
  accessToken: string
  refreshToken?: string
  idToken?: string
  expiresAt?: Date
}

export interface ProviderOptions {
  /**
   * The client ID from the provider
   */
  clientId: string
  /**
   * The client secret from the provider
   */
  clientSecret: string
  /**
   * The scopes to request from the provider
   */
  scopes?: string[]
}

export interface AuthorizationParams {
  /**
   * The state parameter for CSRF protection
   */
  state: string
  /**
   * The redirect URI for the OAuth flow
   */
  redirectURI: string
}

export interface OAuthProvider {
  /**
   * Create the authorization URL for the OAuth flow
   */
  createAuthorizationURL(params: AuthorizationParams): Promise<URL>

  /**
   * Exchange the authorization code for tokens
   */
  validateAuthorizationCode(params: {
    code: string
    state: string
    redirectURI: string
  }): Promise<OAuthTokens>

  /**
   * Refresh the access token using the refresh token
   */
  refreshTokens(refreshToken: string): Promise<OAuthTokens>

  /**
   * Get user information using the access token
   */
  getUserProfile(accessToken: string): Promise<unknown>
}
