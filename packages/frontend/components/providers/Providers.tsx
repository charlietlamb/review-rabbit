'use client'

import DialogProvider from '../dashboard/provider/DialogProvider'
import TanstackQueryProvider from './TanstackQueryProvider'
import { useEffect, useState } from 'react'
import ThemeProvider from './ThemeProvider'

export default function Providers({
  className,
  children,
}: {
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
          {children}
        </TanstackQueryProvider>
      </ThemeProvider>
    </body>
  )
}
