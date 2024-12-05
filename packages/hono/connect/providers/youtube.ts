import {
  BaseProfile,
  OAuthProvider,
  ProviderOptions,
  UploadVideoParams,
  AuthorizationParams,
  ScheduleHandlers,
  ScheduleContent,
  UploadVideoResult,
} from '../types'
import { validateAuthorizationCode } from '../utils/validate-authorization-code'
import { refreshTokens as refreshOAuthTokens } from '../utils/tokens/refresh-tokens'

export interface YouTubeProfile extends BaseProfile {
  sub: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
  channelName?: string
}

export interface YouTubeUploadVideoParams extends UploadVideoParams {
  accessToken: string
}

export type YouTubeOptions = ProviderOptions

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

export function youtube(
  options: YouTubeOptions
): OAuthProvider<YouTubeProfile> & { scheduleHandlers: ScheduleHandlers } {
  const provider = {
    async createAuthorizationURL(params: AuthorizationParams) {
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

    async validateAuthorizationCode(params: {
      code: string
      state: string
      redirectURI: string
    }) {
      try {
        return await validateAuthorizationCode({
          ...params,
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          tokenEndpoint: GOOGLE_TOKEN_URL,
        })
      } catch (error) {
        throw new Error(
          `Failed to validate Google authorization code: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    },

    async refreshTokens(refreshToken: string) {
      try {
        return await refreshOAuthTokens({
          refreshToken,
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          tokenEndpoint: GOOGLE_TOKEN_URL,
        })
      } catch (error) {
        throw new Error(
          `Failed to refresh Google tokens: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    },

    async getUserProfile(accessToken: string): Promise<YouTubeProfile> {
      const response = await fetch(GOOGLE_USERINFO_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(
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
      } as YouTubeProfile
    },

    async uploadVideo({
      accessToken,
      file,
      title,
      description,
      privacyStatus = 'private',
      isShort = true,
      publishAt,
    }: YouTubeUploadVideoParams): Promise<UploadVideoResult> {
      // Convert file to Blob if it's a string (URL)
      const videoBlob =
        typeof file === 'string'
          ? await fetch(file).then((r) => r.blob())
          : file instanceof File
          ? file
          : file

      // Step 1: Get the resumable upload URL with proper metadata
      const uploadResponse = await fetch(
        'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Upload-Content-Type': videoBlob.type || 'video/mp4',
            'X-Upload-Content-Length': videoBlob.size.toString(),
          },
          body: JSON.stringify({
            snippet: {
              title,
              description,
              categoryId: '22',
            },
            status: {
              privacyStatus: publishAt ? 'private' : privacyStatus,
              publishAt: publishAt?.toISOString(),
              selfDeclaredMadeForKids: false,
            },
          }),
        }
      )

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        let errorMessage
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.error?.message || errorText
        } catch {
          errorMessage = errorText
        }
        throw new Error(
          `Failed to get upload URL: ${uploadResponse.status} - ${errorMessage}`
        )
      }

      const uploadUrl = uploadResponse.headers.get('location')
      if (!uploadUrl) {
        throw new Error('No upload URL received')
      }

      // Step 2: Upload the video content
      const videoUploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': videoBlob.type || 'video/mp4',
          'Content-Length': videoBlob.size.toString(),
        },
        body: videoBlob,
      })

      if (!videoUploadResponse.ok) {
        const errorText = await videoUploadResponse.text()
        let errorMessage
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.error?.message || errorText
        } catch {
          errorMessage = errorText
        }
        throw new Error(
          `Upload failed with status ${videoUploadResponse.status} - ${errorMessage}`
        )
      }

      const data = await videoUploadResponse.json()
      return {
        videoId: data.id,
        url: isShort
          ? `https://youtube.com/shorts/${data.id}`
          : `https://youtube.com/watch?v=${data.id}`,
        scheduledTime: publishAt?.toISOString(),
      }
    },

    scheduleHandlers: {
      short: async (data: ScheduleContent): Promise<UploadVideoResult> => {
        // Fetch the video file
        console.log('data.mediaUrl', data.mediaUrl)
        const response = await fetch(data.mediaUrl)
        const contentType = response.headers.get('content-type')
        console.log('contentType', contentType)
        if (!contentType?.startsWith('video/')) {
          throw new Error('Invalid file type. Only video files are supported.')
        }
        const file = await response.blob()

        return await provider.uploadVideo({
          accessToken: data.accessToken,
          file,
          title: data.caption || '',
          description: data.caption || '',
          isShort: true,
          publishAt: new Date(data.scheduledTime),
        })
      },
      video: async (data: ScheduleContent): Promise<UploadVideoResult> => {
        // Fetch the video file
        const response = await fetch(data.mediaUrl)
        const contentType = response.headers.get('content-type')
        if (!contentType?.startsWith('video/')) {
          throw new Error('Invalid file type. Only video files are supported.')
        }
        const file = await response.blob()

        return await provider.uploadVideo({
          accessToken: data.accessToken,
          file,
          title: data.caption || '',
          description: data.caption || '',
          isShort: false,
          publishAt: new Date(data.scheduledTime),
        })
      },
      image: async (): Promise<UploadVideoResult> => {
        throw new Error('Image scheduling not supported for YouTube')
      },
      story: async (): Promise<UploadVideoResult> => {
        throw new Error('Story scheduling not supported for YouTube')
      },
    },
  }

  return provider
}
