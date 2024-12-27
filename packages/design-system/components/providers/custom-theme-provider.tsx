'use client'

import { useAtomValue } from 'jotai'
import { customThemeAtom } from '@burse/design-system/atoms/dashboard/theme/custom-theme-atom'
import { cn } from '@burse/design-system/lib/utils'

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useAtomValue(customThemeAtom)
  return <div className={cn('flex w-full flex-grow', theme)}>{children}</div>
}
