import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@remio/design-system/components/ui/card'

export default function OverviewCard({
  title,
  value,
  icon,
  change,
}: {
  title: string
  value: string
  icon: React.ReactNode
  change: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}
