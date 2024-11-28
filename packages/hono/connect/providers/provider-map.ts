import { OAuthProvider } from '../types'
import { google, GoogleOptions } from './google'
import { instagram, InstagramOptions } from './instagram'
import { env } from '@dubble/env'

// Configure the Google provider
const googleConfig: GoogleOptions = {
  clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
}

// Configure the Instagram provider
const instagramConfig: InstagramOptions = {
  clientId: env.NEXT_PUBLIC_INSTAGRAM_APP_ID,
  clientSecret: env.INSTAGRAM_APP_SECRET,
}

// Initialize providers with their configurations
const googleProvider = google(googleConfig)
const instagramProvider = instagram(instagramConfig)

/**
 * Map of provider IDs to their initialized implementations
 */
export const providerMap = new Map<string, OAuthProvider>([
  ['google', googleProvider],
  ['instagram', instagramProvider],
])
