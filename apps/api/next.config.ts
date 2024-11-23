import { env } from '@dubble/env'
import { config, withAnalyzer } from '@dubble/next-config'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = { ...config }

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
