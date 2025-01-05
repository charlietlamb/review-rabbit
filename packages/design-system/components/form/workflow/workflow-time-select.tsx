import { useState } from 'react'
import { Checkbox } from '@rabbit/design-system/components/ui/checkbox'
import { Label } from '@rabbit/design-system/components/ui/label'
import DateTimePickerState from '../date/date-time-picker-state'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'

export default function WorkflowTimeSelect({
  date,
  setDate,
}: {
  date: Date | null
  setDate: (date: Date | null) => void
}) {
  const [customTime, setCustomTime] = useState<boolean>(false)
  return (
    <div className="flex flex-col gap-4">
      <RequiredLabel htmlFor="custom-time">Time</RequiredLabel>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="custom-time"
            defaultChecked={customTime}
            onCheckedChange={(checked) => setCustomTime(checked === true)}
          />
          <Label htmlFor="custom-time">
            Custom time{' '}
            <span className="text-muted-foreground">
              (if unchecked automation will run now)
            </span>
          </Label>
        </div>
        {customTime && (
          <DateTimePickerState
            value={date ?? new Date()}
            setValue={setDate}
            name="date"
            label="Date"
            placeholder="Select a date"
            hideLabel
            required
          />
        )}
      </div>
    </div>
  )
}
