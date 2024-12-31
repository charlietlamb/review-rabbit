import { getEnv } from '@rabbit/env'
import { config, withAnalyzer } from '@rabbit/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = { ...config }

if (getEnv().ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
