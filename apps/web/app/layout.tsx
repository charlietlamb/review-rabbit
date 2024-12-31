import type { Metadata } from 'next'
import { DesignSystemProvider } from '@rabbit/design-system'
import '@rabbit/design-system/styles/globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'review-rabbit',
  description: 'review-rabbit',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased flex flex-col min-h-screen relative light:bg-background font-sans`}
      >
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  )
}
