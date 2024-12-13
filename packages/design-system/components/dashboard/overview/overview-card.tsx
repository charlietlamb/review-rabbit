import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@remio/design-system/components/ui/card'
import { cn } from '@remio/design-system/lib/utils'

export default function OverviewCard({
  title,
  value,
  icon,
  change,
}: {
  title: string
  value: string
  icon: React.ReactNode
  change: number
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            'text-xs text-muted-foreground',
            change > 0 ? 'text-emerald-500' : change < 0 ? 'text-red-500' : ''
          )}
        >
          {change > 0 ? '+' : ''}
          {change.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  )
}
