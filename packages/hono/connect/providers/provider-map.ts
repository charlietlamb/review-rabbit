import { OAuthProvider } from '../types'
import { youtube, YouTubeOptions } from './youtube'
import { instagram, InstagramOptions } from './instagram'
import { env } from '@dubble/env'

// Configure the Google provider
const youtubeConfig: YouTubeOptions = {
  clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
}

// Configure the Instagram provider
const instagramConfig: InstagramOptions = {
  clientId: env.NEXT_PUBLIC_INSTAGRAM_APP_ID,
  clientSecret: env.INSTAGRAM_APP_SECRET,
}

// Initialize providers with their configurations
const youtubeProvider = youtube(youtubeConfig)
const instagramProvider = instagram(instagramConfig)

/**
 * Map of provider IDs to their initialized implementations
 */
export const providerMap = new Map<string, OAuthProvider>([
  ['youtube', youtubeProvider],
  ['instagram', instagramProvider],
])
