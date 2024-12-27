import { env } from '@burse/env'
import { config, withAnalyzer } from '@burse/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = { ...config }

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [
    {
      source: '/legal',
      destination: '/legal/privacy',
      statusCode: 301,
    },
  ]

  nextConfig.redirects = redirects
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
