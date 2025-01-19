import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@rabbit/design-system/components/ui/card'
import { cn } from '@rabbit/design-system/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@rabbit/design-system/components/ui/tooltip'

export default function OverviewCard({
  title,
  value,
  icon,
  change,
  changeValue,
}: {
  title: string
  value: string
  icon: React.ReactNode
  change: string
  changeValue: number
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-1 text-muted-foreground justify-between">
        <CardTitle className="font-heading text-base">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <Tooltip>
          <TooltipTrigger>
            <p
              className={cn(
                'text-xs text-muted-foreground',
                changeValue > 0
                  ? 'text-emerald-500'
                  : changeValue < 0
                    ? 'text-red-500'
                    : ''
              )}
            >
              {changeValue > 0 ? '+' : ''}
              {change}
            </p>
          </TooltipTrigger>
          <TooltipContent>Compared to the previous period</TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  )
}
