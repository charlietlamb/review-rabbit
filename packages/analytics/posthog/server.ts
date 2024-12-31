import 'server-only'
import { getEnv } from '@rabbit/env'
import { PostHog } from 'posthog-node'

export const analytics = new PostHog(getEnv().NEXT_PUBLIC_POSTHOG_KEY, {
  host: getEnv().NEXT_PUBLIC_POSTHOG_HOST,

  // Don't batch events and flush immediately - we're running in a serverless environment
  flushAt: 1,
  flushInterval: 0,
})
