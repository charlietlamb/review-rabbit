import { getEnv } from '@rabbit/env'
import { config, withAnalyzer } from '@rabbit/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = config

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

if (getEnv().ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
