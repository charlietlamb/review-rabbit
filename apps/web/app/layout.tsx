import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Bricolage_Grotesque } from 'next/font/google'
import { DesignSystemProvider } from '@ff/design-system'
import '@ff/design-system/styles/globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
})

export const metadata: Metadata = {
  title: 'ff',
  description: 'ff',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${bricolageGrotesque.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <DesignSystemProvider>{children}</DesignSystemProvider>
      </body>
    </html>
  )
}
