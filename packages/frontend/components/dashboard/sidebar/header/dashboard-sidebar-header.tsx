import { SidebarHeader } from '@/components/ui/sidebar'
import Link from 'next/link'
import DashboardSidebarHeaderThemeToggle from './dashboard-sidebar-header-theme-toggle'

export default function DashboardSidebarHeader() {
  return (
    <SidebarHeader className="h-10 border-b w-full font-black flex flex-row items-center justify-between">
      <Link href="/">Remio</Link>
      <DashboardSidebarHeaderThemeToggle />
    </SidebarHeader>
  )
}
