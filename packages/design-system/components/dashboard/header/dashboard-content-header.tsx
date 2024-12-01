export default function DashboardContentHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div>
        <h1 className="text-lg font-bold font-heading truncate">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
