import type { Metadata } from 'next'
import { DesignSystemProvider } from '@burse/design-system'
import '@burse/design-system/styles/globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'burse',
  description: 'burse',
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
