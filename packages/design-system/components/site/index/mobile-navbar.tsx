'use client'

import { Menu, X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@rabbit/design-system/lib/utils'

export function MobileNavbar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const overflow = isOpen ? 'hidden' : 'auto'
    document.documentElement.style.overflow = overflow
  }, [isOpen])

  useEffect(() => {
    const closeHamburgerNavigation = () => setIsOpen(false)
    window.addEventListener('orientationchange', closeHamburgerNavigation)
    window.addEventListener('resize', closeHamburgerNavigation)

    return () => {
      window.removeEventListener('orientationchange', closeHamburgerNavigation)
      window.removeEventListener('resize', closeHamburgerNavigation)
    }
  }, [])

  return (
    <div className="md:hidden">
      <button
        className="flex items-center justify-center h-14 w-14 text-foreground hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen && (
        <div
          className={cn(
            'fixed left-0 right-0 top-14 bottom-0 z-40',
            'bg-background/80 backdrop-blur-sm',
            'animate-in fade-in-0 slide-in-from-top-5 duration-300'
          )}
        >
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative bg-background border-t">{children}</div>
        </div>
      )}
    </div>
  )
}
