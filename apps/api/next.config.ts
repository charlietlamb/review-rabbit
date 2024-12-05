import { env } from '@remio/env'
import { config, withAnalyzer } from '@remio/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = { ...config }

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
