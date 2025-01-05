'use client'

import { useAtomValue } from 'jotai'
import { customThemeAtom } from '@rabbit/design-system/atoms/dashboard/theme/custom-theme-atom'
import { useEffect, useState } from 'react'

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const theme = useAtomValue(customThemeAtom)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const htmlElement = document.documentElement
    // Remove any existing theme classes
    const themeClasses = ['blue', 'red', 'orange', 'green', 'yellow', 'violet']
    htmlElement.classList.remove(...themeClasses)
    // Add new theme class
    htmlElement.classList.add(theme)
  }, [theme, mounted])

  return <>{children}</>
}
