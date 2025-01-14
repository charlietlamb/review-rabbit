import { DropdownMenuContent } from '@rabbit/design-system/components/ui/dropdown-menu'
import DashboardSidebarFooterDropdown from './dashboard-sidebar-footer-dropdown'

export default function DashboardSidebarFooterMenu() {
  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-border/50 
        bg-gradient-to-b from-background to-muted/20 shadow-lg backdrop-blur-sm 
        transition-all duration-300 ease-out-expo
        data-[state=open]:animate-in data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
        data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98 
        data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:slide-in-from-bottom-2
        data-[state=open]:translate-y-0 data-[state=closed]:translate-y-1
        data-[state=open]:opacity-100 data-[state=closed]:opacity-0
        motion-reduce:transition-none motion-reduce:transform-none"
      side="top"
      align="center"
      sideOffset={12}
    >
      <div className="animate-in fade-in-50 duration-300 ease-out-expo">
        <DashboardSidebarFooterDropdown />
      </div>
    </DropdownMenuContent>
  )
}
