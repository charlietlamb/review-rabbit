'use client'

import TanstackQueryProvider from './tanstack-query-provider'
import { useEffect, useState } from 'react'
import ThemeProvider from './theme-provider'
import { Toaster } from '@/components/ui/sonner'

export default function Providers({
  user,
  className,
  children,
}: {
  user: User | null
  className?: string
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TanstackQueryProvider>
        <Toaster />
        {children}
      </TanstackQueryProvider>
    </ThemeProvider>
  )
}
