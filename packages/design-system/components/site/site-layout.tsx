import React from 'react'
import { Footer } from '@rabbit/design-system/components/site/footer/footer'
import { Header } from '@rabbit/design-system/components/site/header/header'
import { cn } from '@rabbit/design-system/lib/utils'
import { authClient } from '@rabbit/design-system/lib/authClient'

export default async function SiteLayout({
  home,
  children,
}: {
  home?: boolean
  children: React.ReactNode
}) {
  const session = await authClient.getSession()
  console.log(session)
  return (
    <div
      className={cn(
        'bg-background min-h-screen flex flex-col overflow-y-hidden',
        !home && 'pt-[64px]'
      )}
    >
      <Header loggedIn={!!session} />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
