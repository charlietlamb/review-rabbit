'use client'

import DialogProvider from '../dashboard/provider/DialogProvider'
import TanstackQueryProvider from './TanstackQueryProvider'
import { useEffect, useState } from 'react'
import ThemeProvider from './ThemeProvider'
import SessionProvider from './SessionProvider'

export default function Providers({
  user,
  jwt,
  className,
  children,
}: {
  user: User | null
  jwt: string | null
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
    <body className={className}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TanstackQueryProvider>
          <DialogProvider />
          <SessionProvider user={user} jwt={jwt}>
            {children}
          </SessionProvider>
        </TanstackQueryProvider>
      </ThemeProvider>
    </body>
  )
}
