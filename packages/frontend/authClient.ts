import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from '@/backend/auth'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8000/api/auth',
  plugins: [inferAdditionalFields<typeof auth>()],
})
