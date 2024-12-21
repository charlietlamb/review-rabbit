import { Card } from '@remio/design-system/components/ui/card'
import OverviewScheduleHeader from './overview-schedule-header'
import OverviewScheduleDatePicker from './overview-schedule-date-picker'
import OverviewScheduleMonthPicker from './overview-schedule-month-picker'
import OverviewScheduleMediations from './overview-schedule-mediations'
import ClientSelectSlick from '@remio/design-system/components/dashboard/clients/client-select-slick'
import { useAtom } from 'jotai'
import { overviewScheduleClientAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'

export default function OverviewSchedule() {
  const [client, setClient] = useAtom(overviewScheduleClientAtom)
  return (
    <Card className="flex flex-col p-2 gap-2 h-[600px]">
      <OverviewScheduleHeader />
      <OverviewScheduleMonthPicker />
      <OverviewScheduleDatePicker />
      <ClientSelectSlick value={client} setValue={setClient} className="mt-2" />
      <OverviewScheduleMediations />
    </Card>
  )
}
