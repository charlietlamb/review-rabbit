import { OAuthProvider } from '../types'
import { youtube, YouTubeOptions } from './youtube'
import { instagram, InstagramOptions } from './instagram'
import { tiktok, TikTokOptions } from './tiktok'
import { env } from '@dubble/env'

// Configure the providers
const youtubeConfig: YouTubeOptions = {
  clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
}

const instagramConfig: InstagramOptions = {
  clientId: env.NEXT_PUBLIC_INSTAGRAM_APP_ID,
  clientSecret: env.INSTAGRAM_APP_SECRET,
}

const tiktokConfig: TikTokOptions = {
  clientId: env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY,
  clientSecret: env.TIKTOK_CLIENT_SECRET,
}

// Initialize providers with their configurations
const youtubeProvider = youtube(youtubeConfig)
const instagramProvider = instagram(instagramConfig)
const tiktokProvider = tiktok(tiktokConfig)

/**
 * Map of provider IDs to their initialized implementations
 */
export const providerMap = new Map<string, OAuthProvider>([
  ['youtube', youtubeProvider],
  ['instagram', instagramProvider],
  ['tiktok', tiktokProvider],
])
