import React from 'react'
import { Footer } from '@dubble/design-system/components/site/footer/footer'
import { Header } from '@dubble/design-system/components/site/header/header'
import { cn } from '@dubble/design-system/lib/utils'

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
