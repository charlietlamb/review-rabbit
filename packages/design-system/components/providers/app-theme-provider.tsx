'use client'

import CustomThemeProvider from '@rabbit/design-system/components/providers/custom-theme-provider'
import { ThemeProvider } from 'next-themes'

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <CustomThemeProvider>{children}</CustomThemeProvider>
    </ThemeProvider>
  )
}
