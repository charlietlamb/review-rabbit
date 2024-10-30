import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from '@/backend/auth'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8000/api/auth', // the base url of your auth server
  plugins: [inferAdditionalFields<typeof auth>()],
})
