import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    AUTH_DRIZZLE_URL: z.string().url(),
    AUTH_RESEND_KEY: z.string(),
    UPLOADTHING_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_LOCATION: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_LOCATION: process.env.NEXT_PUBLIC_LOCATION,
  },
})

export default env
