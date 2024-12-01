'use client'

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
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}
