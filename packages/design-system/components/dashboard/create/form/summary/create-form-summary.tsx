import { useAtomValue } from 'jotai'
import {
  createScheduleAtom,
  createSelectedProvidersAtom,
  createTypeAtom,
} from '@ff/design-system/atoms/dashboard/create/create-atom'
import { format } from 'date-fns'

export default function CreateFormSummary() {
  const schedule = useAtomValue(createScheduleAtom)
  const providers = useAtomValue(createSelectedProvidersAtom)

  return (
    <div className="grid">
      <div className="inline-flex items-center gap-2">
        Scheduled on
        <span className="font-bold font-heading">
          {format(schedule, 'MMM d, yyyy')}
        </span>
        at{' '}
        <span className="font-bold font-heading">
          {format(schedule, 'h:mm a')}
        </span>{' '}
        for{' '}
        {providers.map((provider) => (
          <div key={provider.id} className="w-fit">
            {provider.colorIcon}
          </div>
        ))}
      </div>
    </div>
  )
}
