import { env } from '@ff/env'
import { config, withAnalyzer } from '@ff/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = { ...config }

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
