'use client'
import { SidebarTrigger } from '@ff/design-system/components/ui/sidebar'
import { useIsMobile } from '@ff/design-system/hooks/use-mobile'

export default function DashboardSidebarToggle() {
  const mobile = useIsMobile()
  if (!mobile) return null

  return <SidebarTrigger className="ml-2" />
}
