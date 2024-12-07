import { DropdownMenuContent } from '@remio/design-system/components/ui/dropdown-menu'
import DashboardSidebarFooterDropdown from './dashboard-sidebar-footer-dropdown'

export default function DashboardSidebarFooterMenu() {
  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-l"
      side="bottom"
      align="end"
      sideOffset={4}
    >
      <DashboardSidebarFooterDropdown />
    </DropdownMenuContent>
  )
}
