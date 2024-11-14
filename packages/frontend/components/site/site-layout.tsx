import React from 'react'
import { Footer } from '@/components/site/footer/footer'
import { Header } from '@/components/site/header/header'
import { cn } from '@/lib/utils'

export default function SiteLayout({
  home,
  children,
}: {
  home?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'dark bg-background min-h-screen flex flex-col',
        !home && 'py-[72px]'
      )}
    >
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
