import { AppRouteHandler } from '@dubble/hono/lib/types'
import { ConnectGoogleRoute } from './connect.routes'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/connect/google' // your redirect URI
)

export const connectGoogle: AppRouteHandler<ConnectGoogleRoute> = async (c) => {
  const { code } = c.req.query()

  if (!code) {
    return c.json({ error: 'No authorization code provided' }, 400)
  }

  try {
    // Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Get user info using the oauth2 v2 API
    const oauth2 = google.oauth2('v2')
    const userInfo = await oauth2.userinfo.get({ auth: oauth2Client })

    return c.json({
      email: userInfo.data.email,
      name: userInfo.data.name,
      picture: userInfo.data.picture,
      id: userInfo.data.id,
    })
  } catch (error) {
    console.error('Error getting Google account info:', error)
    return c.json({ error: 'Failed to get Google account info' }, 500)
  }
}
