import { Badge } from '@remio/design-system/components/ui/badge'
import { CardHeader, CardTitle } from '@remio/design-system/components/ui/card'
import { Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OverviewScheduleHeader() {
  const router = useRouter()
  return (
    <CardHeader className="flex flex-row justify-between p-2 items-center">
      <CardTitle className="flex flex-row items-center gap-2 text-lg">
        <Calendar /> Schedule
      </CardTitle>
      <Badge
        variant="outline"
        onClick={() => router.push('/dashboard/schedule')}
        className="cursor-pointer"
      >
        See all
      </Badge>
    </CardHeader>
  )
}
