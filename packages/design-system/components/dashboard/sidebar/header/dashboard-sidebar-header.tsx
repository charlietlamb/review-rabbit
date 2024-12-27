'use client'

import {
  SidebarHeader,
  useSidebar,
} from '@burse/design-system/components/ui/sidebar'
import Link from 'next/link'
import { cn } from '@burse/design-system/lib/utils'

export default function DashboardSidebarHeader() {
  const { open } = useSidebar()
  return (
    <SidebarHeader
      className={cn(
        'h-10 border-b w-full font-black flex flex-row items-center justify-between border-none',
        !open && 'justify-center'
      )}
    >
      <Link href="/">{open ? 'burse' : 'r'}</Link>
    </SidebarHeader>
  )
}
