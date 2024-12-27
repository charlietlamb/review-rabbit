import React from 'react'
import { Footer } from '@burse/design-system/components/site/footer/footer'
import { Header } from '@burse/design-system/components/site/header/header'
import { cn } from '@burse/design-system/lib/utils'

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
        'dark bg-background min-h-screen flex flex-col overflow-y-hidden',
        !home && 'py-[72px]'
      )}
    >
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
