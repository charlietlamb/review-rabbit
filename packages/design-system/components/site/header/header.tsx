'use client'

import { Logo } from './logo'
import { DesktopNav } from './nav/desktop-nav'
import { MobileNav } from './nav/mobile-nav'
import { cn } from '@rabbit/design-system/lib/utils'

export function Header({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0',
        'z-50 h-14 md:h-12 w-full',
        'flex items-center md:justify-between',
        'bg-background/80 backdrop-blur-sm',
        'border-b rounded-b-lg'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <Logo className="h-full ml-4" />
        <div className="flex items-center">
          <DesktopNav loggedIn={loggedIn} />
          <MobileNav loggedIn={loggedIn} />
        </div>
      </div>
    </header>
  )
}
