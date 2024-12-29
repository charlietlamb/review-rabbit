import { getEnv } from '@burse/env'
import { config, withAnalyzer } from '@burse/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = { ...config }

if (getEnv().ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
