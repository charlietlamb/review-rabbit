'use client'

import TanstackQueryProvider from './tanstack-query-provider'
import { useEffect, useState } from 'react'
import ThemeProvider from './theme-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  )
}
