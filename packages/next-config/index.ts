import { getEnv } from '@rabbit/env'
import withBundleAnalyzer from '@next/bundle-analyzer'
import withVercelToolbar from '@vercel/toolbar/plugins/next'
import type { NextConfig } from 'next'

export const config: NextConfig = withVercelToolbar()({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: getEnv().NEXT_PUBLIC_AWS_S3_URL.split('/')[2],
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: getEnv().NEXT_PUBLIC_AWS_CLOUDFRONT_URL.split('/')[2],
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1xwrryt2q5y73.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // biome-ignore lint/suspicious/useAwait: rewrites is async
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ]
  },

  // biome-ignore lint/suspicious/useAwait: headers is async
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: createSecureHeaders({
  //         // HSTS Preload: https://hstspreload.org/
  //         forceHTTPSRedirect: [
  //           true,
  //           { maxAge: 63_072_000, includeSubDomains: true, preload: true },
  //         ],
  //       }),
  //     },
  //   ]
  // },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
})

export const withAnalyzer = (sourceConfig: NextConfig): NextConfig =>
  withBundleAnalyzer()(sourceConfig)
