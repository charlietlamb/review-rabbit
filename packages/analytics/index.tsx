import { env } from '@rabbit/env'
import type { ReactNode } from 'react'
import { PostHogProvider } from './posthog/client'
import { VercelAnalytics } from './vercel'

type AnalyticsProviderProps = {
  readonly children: ReactNode
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <PostHogProvider>
    {children}
    {/* <VercelAnalytics /> */}
    {/* {env.NODE_ENV !== 'development' && (
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    )} */}
  </PostHogProvider>
)
