import { env } from '@rabbit/env'
import { config, withAnalyzer } from '@rabbit/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = config

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
