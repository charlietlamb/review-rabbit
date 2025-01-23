import type { Metadata, Viewport } from 'next'
import { DesignSystemProvider } from '@rabbit/design-system'
import '@rabbit/design-system/styles/globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Kanit } from 'next/font/google'
import { env } from '@rabbit/env'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_WEB),
  title: {
    default: 'Review Rabbit - Automated Review Generation Platform',
    template: '%s | Review Rabbit',
  },
  description:
    "Automatically identify clients who haven't left reviews and engage them with personalized outreach. Get more genuine reviews, build trust, and grow your business.",
  keywords: [
    'customer reviews',
    'review generation',
    'business reviews',
    'review automation',
    'customer feedback',
    'review management',
    'reputation management',
  ],
  authors: [{ name: 'Review Rabbit Team' }],
  creator: 'Review Rabbit',
  publisher: 'Review Rabbit',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reviewrabbit.ai',
    siteName: 'Review Rabbit',
    title: 'Review Rabbit - Get More Genuine Customer Reviews',
    description:
      "Turn happy customers into glowing reviews. Automatically identify clients who haven't reviewed your business and engage them with personalized outreach campaigns.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Review Rabbit - Automated Review Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Review Rabbit - Get More Genuine Customer Reviews',
    description:
      'Turn happy customers into glowing reviews with automated, personalized outreach campaigns.',
    images: ['/og-image.png'],
    creator: '@reviewrabbit',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Review Rabbit',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${kanit.variable} antialiased flex flex-col min-h-screen relative bg-background font-sans`}
      >
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  )
}
