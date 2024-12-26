import { CardHeader, CardTitle } from '@remio/design-system/components/ui/card'
import { Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@remio/design-system/components/ui/button'

export default function OverviewScheduleHeader() {
  const router = useRouter()
  return (
    <CardHeader className="flex flex-row justify-between p-2 items-center pt-0">
      <CardTitle className="flex flex-row items-center gap-2 text-lg">
        <Calendar /> Schedule
      </CardTitle>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push('/dashboard/invoices/manage')}
      >
        View All
      </Button>
    </CardHeader>
  )
}
