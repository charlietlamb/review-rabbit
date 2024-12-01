import { createScheduleAtom } from '@ff/design-system/atoms/dashboard/create/create-atom'
import { DateTimeInputComplex } from '@ff/design-system/components/misc/date-time-input-complex'
import { Label } from '@ff/design-system/components/ui/label'
import { useAtom } from 'jotai'

export default function CreateFormSchedule() {
  const [schedule, setSchedule] = useAtom(createScheduleAtom)
  return (
    <div className="flex flex-col gap-4 p-4">
      <Label className="font-heading font-bold">Schedule</Label>
      <DateTimeInputComplex value={schedule} setValue={setSchedule} />
    </div>
  )
}
