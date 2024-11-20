'use client'

import { useState, useEffect } from 'react'
import { Logo } from './logo'
import { DesktopNav } from './nav/desktop-nav'
import { MobileNav } from './nav/mobile-nav'
import { cn } from '@/lib/utils'

export function Header() {
  const [hasBackground, setHasBackground] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasBackground(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-10 py-4 transition-all duration-1000 px-32',
        hasBackground && 'bg-background/50 shadow-md backdrop-blur-lg'
      )}
    >
      <Logo />
      <DesktopNav />
      <MobileNav />
    </header>
  )
}
