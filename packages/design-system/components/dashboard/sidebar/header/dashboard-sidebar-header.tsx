'use client'

import {
  SidebarHeader,
  useSidebar,
} from '@remio/design-system/components/ui/sidebar'
import Link from 'next/link'
import DashboardSidebarThemeToggle from '../toggle/dashboard-sidebar-theme-toggle'
import { cn } from '@remio/design-system/lib/utils'

export default function DashboardSidebarHeader() {
  const { open } = useSidebar()
  return (
    <SidebarHeader
      className={cn(
        'h-10 border-b w-full font-black flex flex-row items-center justify-between border-none',
        !open && 'justify-center'
      )}
    >
      <Link href="/">{open ? 'remio' : 'remio'}</Link>
      <DashboardSidebarThemeToggle />
    </SidebarHeader>
  )
}
