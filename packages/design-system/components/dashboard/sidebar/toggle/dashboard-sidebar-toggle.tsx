'use client'
import { SidebarTrigger } from '@burse/design-system/components/ui/sidebar'
import { useIsMobile } from '@burse/design-system/hooks/use-mobile'

export default function DashboardSidebarToggle() {
  const mobile = useIsMobile()
  if (!mobile) return null

  return <SidebarTrigger className="ml-2" />
}
