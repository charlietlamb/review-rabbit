'use client'

import { useAtomValue } from 'jotai'
import { customThemeAtom } from '@rabbit/design-system/atoms/dashboard/theme/custom-theme-atom'
import { useEffect } from 'react'

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useAtomValue(customThemeAtom)

  useEffect(() => {
    const htmlElement = document.documentElement
    // Remove any existing theme classes
    const themeClasses = ['blue', 'red', 'orange', 'green', 'yellow', 'violet']
    htmlElement.classList.remove(...themeClasses)
    // Add new theme class
    htmlElement.classList.add(theme)
  }, [theme])

  return <>{children}</>
}
