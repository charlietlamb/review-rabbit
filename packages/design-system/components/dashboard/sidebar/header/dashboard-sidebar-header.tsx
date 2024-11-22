import { SidebarHeader } from '@dubble/design-system/components/ui/sidebar'
import Link from 'next/link'
import DashboardSidebarHeaderThemeToggle from './dashboard-sidebar-header-theme-toggle'

export default function DashboardSidebarHeader() {
  return (
    <SidebarHeader className="h-10 border-b w-full font-black flex flex-row items-center justify-between border-none">
      <Link href="/">dubble</Link>
      <DashboardSidebarHeaderThemeToggle />
    </SidebarHeader>
  )
}
