import { getEnv } from '@rabbit/env'
import type { ReactNode } from 'react'
import { GoogleAnalytics } from './google'
import { PostHogProvider } from './posthog/client'
import { VercelAnalytics } from './vercel'

type AnalyticsProviderProps = {
  readonly children: ReactNode
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <PostHogProvider>
    {children}
    <VercelAnalytics />
    {/* {getEnv().NODE_ENV !== 'development' && (
      <GoogleAnalytics gaId={getEnv().NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    )} */}
  </PostHogProvider>
)
