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
    <div className="flex items-center px-4 py-2">
      {left}
      <div>
        <h1 className="text-lg font-bold font-heading truncate">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {right}
    </div>
  )
}
