import React from 'react'
import { Footer } from '@remio/design-system/components/site/footer/footer'
import { Header } from '@remio/design-system/components/site/header/header'
import { cn } from '@remio/design-system/lib/utils'

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
        'light bg-background min-h-screen flex flex-col',
        !home && 'py-[72px]'
      )}
    >
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
