'use client'

import AppThemeProvider from './app-theme-provider'
import TanstackQueryProvider from './tanstack-query-provider'
import { useEffect, useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <AppThemeProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </AppThemeProvider>
  )
}
