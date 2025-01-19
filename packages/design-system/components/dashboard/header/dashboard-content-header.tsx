import DashboardSidebarToggle from '../sidebar/toggle/dashboard-sidebar-toggle'

export default function DashboardContentHeader({
  title,
  subtitle,
  left,
  right,
}: {
  title: string
  subtitle: string
  left?: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <div className="flex items-center px-4 h-16 min-h-16">
      <DashboardSidebarToggle className="mr-4 text-muted-foreground hover:text-foreground transition-all duration-300" />
      {left}
      <div>
        <h1 className="text-lg font-bold font-heading truncate">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {right}
    </div>
  )
}
