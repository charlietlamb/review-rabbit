import DashboardHeaderActionItem from './dashboard-header-action-item'

export default function DashboardHeaderActions() {
  return (
    <div className="flex items-center ml-auto divide-x h-full">
      <div className="h-full" />
      <DashboardHeaderActionItem>New Automation</DashboardHeaderActionItem>
    </div>
  )
}
