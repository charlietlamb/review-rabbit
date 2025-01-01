'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rabbit/design-system/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@rabbit/design-system/components/ui/chart'
import { useAtom } from 'jotai'
import { clientsDateRange } from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'
import { DateRangePicker } from '@rabbit/design-system/components/misc/date-range-picker'
import { useAtomValue } from 'jotai'
import { clientsChartData } from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'

const chartConfig = {
  clients: {
    label: 'Clients',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function ClientsChart({ className }: { className?: string }) {
  const [dateRange, setDateRange] = useAtom(clientsDateRange)
  const chartData = useAtomValue(clientsChartData)
  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-lg">Client Activity</CardTitle>
          <CardDescription>
            Showing total clients for the last 3 months
          </CardDescription>
        </div>
        <DateRangePicker date={dateRange} setDate={setDateRange} />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillClients" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-clients)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-clients)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="clients"
              type="natural"
              fill="url(#fillClients)"
              stroke="var(--color-clients)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
