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

export interface BaseProfile {
  id: string
  email: string
  name: string
  picture?: string
  sub?: string
}

export interface UploadVideoParams {
  accessToken: string
  file: File | Blob | string
  title: string
  description: string
  privacyStatus?: 'private' | 'unlisted' | 'public'
  isShort?: boolean
  publishAt?: Date
}

export interface UploadVideoResult {
  videoId: string
  url: string
  scheduledTime?: string
}

export interface ScheduleContent {
  mediaUrl: string
  caption?: string
  scheduledTime: string
  accessToken: string
}

export type ScheduleFunction = (
  data: ScheduleContent
) => Promise<UploadVideoResult>

export interface ScheduleHandlers {
  image: ScheduleFunction
  video: ScheduleFunction
  short: ScheduleFunction
  story: ScheduleFunction
}
export interface ProviderWithSchedule extends OAuthProvider {
  scheduleContent: (
    type: keyof ScheduleHandlers,
    data: ScheduleContent
  ) => Promise<boolean>
  scheduleHandlers: ScheduleHandlers
}

export interface OAuthProvider<TProfile extends BaseProfile = BaseProfile> {
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
  getUserProfile(accessToken: string): Promise<TProfile>

  /**
   * Upload a video to the provider
   */
  uploadVideo(params: UploadVideoParams): Promise<UploadVideoResult>
}
