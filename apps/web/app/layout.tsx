import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { DesignSystemProvider } from '@remio/design-system'
import '@remio/design-system/styles/globals.css'
import { GeistSans } from 'geist/font/sans'

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
})

export const metadata: Metadata = {
  title: 'remio',
  description: 'remio',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${bricolageGrotesque.variable} antialiased flex flex-col min-h-screen relative light:bg-background font-sans`}
      >
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  )
}
