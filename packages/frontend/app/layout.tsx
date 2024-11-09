import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Providers from '@/components/providers/providers'
import { Bricolage_Grotesque } from 'next/font/google'

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
  title: 'Remio',
  description: 'Remio',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
