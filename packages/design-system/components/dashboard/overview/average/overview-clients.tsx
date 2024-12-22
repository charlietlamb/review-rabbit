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
import { averageClientsAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import { Badge } from '@remio/design-system/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@remio/design-system/components/ui/tooltip'
import { cn } from '@remio/design-system/lib/utils'

const chartConfig = {
  clients: {
    label: 'Total Clients',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function OverviewClients() {
  const clientsData = useAtomValue(averageClientsAtom)

  // Get current and previous month's totals
  const currentTotal =
    clientsData.findLast((item) => item.clients > 0)?.clients ?? 0
  const previousTotal =
    clientsData.slice(0, -1).findLast((item) => item.clients > 0)?.clients ?? 0

  // Calculate gain
  const gain =
    previousTotal === 0
      ? currentTotal
      : ((currentTotal - previousTotal) / previousTotal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Total Clients</CardTitle>
        <div className="text-xl text-foreground font-bold flex items-center gap-2">
          {currentTotal}
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className={cn(
                  'bg-emerald-500/20 border-emerald-500 border text-emerald-500',
                  gain === 0 &&
                    'bg-gray-500/20 border-gray-500 border text-gray-500',
                  gain < 0 && 'bg-red-500/20 border-red-500 border text-red-500'
                )}
              >
                {gain >= 0 && '+'}
                {gain.toFixed(1)}%
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
            data={clientsData}
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
                  labelFormatter={(value) => value}
                  formatter={(value) => (
                    <span className="font-mono font-medium text-foreground">
                      {value}
                    </span>
                  )}
                  indicator="line"
                  className="backdrop-blur-sm"
                />
              }
            />
            <Line
              dataKey="clients"
              type="natural"
              stroke="var(--color-clients)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: 'var(--color-clients)',
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
