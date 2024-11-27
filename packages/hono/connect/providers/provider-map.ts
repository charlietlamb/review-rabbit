import { OAuthProvider } from '../types'
import { google, GoogleOptions } from './google'
import { env } from '@dubble/env'

// Configure the Google provider
const googleConfig: GoogleOptions = {
  clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  scopes: [], // Add any additional scopes here
  accessType: 'offline',
  prompt: 'consent',
}

// Initialize providers with their configurations
const googleProvider = google(googleConfig)

/**
 * Map of provider IDs to their initialized implementations
 */
export const providerMap = new Map<string, OAuthProvider>([
  ['google', googleProvider],
])
