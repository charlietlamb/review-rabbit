'use client'

import { Logo } from './logo'
import { DesktopNav } from './nav/desktop-nav'
import { MobileNav } from './nav/mobile-nav'
import { cn } from '@burse/design-system/lib/utils'

export function Header({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-background border-b divide-x h-16'
      )}
    >
      <Logo className="px-4" />
      <DesktopNav loggedIn={loggedIn} />
      <MobileNav loggedIn={loggedIn} />
    </header>
  )
}
