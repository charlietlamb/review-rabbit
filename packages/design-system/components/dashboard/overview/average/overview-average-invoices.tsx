import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@remio/design-system/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@remio/design-system/components/ui/chart'
import { useAtomValue } from 'jotai'
import { averageInvoiceAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import { Badge } from '@remio/design-system/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@remio/design-system/components/ui/tooltip'
import { cn } from '@remio/design-system/lib/utils'
const chartConfig = {
  average: {
    label: 'Average Invoice',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function OverviewAverageInvoices() {
  const averageInvoice = useAtomValue(averageInvoiceAtom)

  // Get current and previous month's averages
  const currentAverage =
    averageInvoice.findLast((item) => item.average > 0)?.average ?? 0
  const previousAverage =
    averageInvoice.slice(0, -1).findLast((item) => item.average > 0)?.average ??
    0

  // Calculate gain
  const gain =
    previousAverage === 0
      ? currentAverage
      : ((currentAverage - previousAverage) / previousAverage) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Average Invoice</CardTitle>
        <div className="text-xl text-foreground font-bold flex items-center gap-2">
          £{currentAverage.toFixed(2)}
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className={cn(
                  'bg-emerald-500/20 border-emerald-500 border text-emerald-500',
                  gain == 0 &&
                    'bg-gray-500/20 border-gray-500 border text-gray-500',
                  gain < 0 && 'bg-red-500/20 border-red-500 border text-red-500'
                )}
              >
                {gain >= 0 && '+'}
                {previousAverage === 0 ? '£' : ''}
                {gain.toFixed(2)}
                {previousAverage > 0 && '%'}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Compared to the previous month</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="overflow-visible">
          <LineChart
            accessibilityLayer
            data={averageInvoice}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={{
                stroke: 'var(--border)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return value
                  }}
                  formatter={(value) => (
                    <span className="font-mono font-medium text-foreground">
                      £{Number(value).toFixed(2)}
                    </span>
                  )}
                  indicator="line"
                  className="backdrop-blur-sm"
                />
              }
            />
            <Line
              dataKey="average"
              type="natural"
              stroke="var(--color-average)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: 'var(--color-average)',
                stroke: 'var(--background)',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
