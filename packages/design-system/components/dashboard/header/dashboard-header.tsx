'use client'

import { useAtomValue } from 'jotai'
import { accountAtom } from '@rabbit/design-system/atoms/user/user-atom'
import { RiGoogleFill } from '@remixicon/react'

export default function DashboardHeader() {
  const account = useAtomValue(accountAtom)
  if (account) return null
  return (
    <div className="md:h-12 h-10 border-b flex items-center justify-center gap-2 bg-background text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-300">
      <RiGoogleFill />
      Connect Google Account
    </div>
  )
}
