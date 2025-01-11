'use client'
import { SidebarTrigger } from '@rabbit/design-system/components/ui/sidebar'
import { useIsMobile } from '@rabbit/design-system/hooks/use-mobile'

export default function DashboardSidebarToggle({
  className,
}: {
  className?: string
}) {
  const mobile = useIsMobile()
  if (!mobile) return null

  return <SidebarTrigger className={className} />
}
