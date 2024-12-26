import { useAtomValue } from 'jotai'
import { overviewScheduleMediationsAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import OverviewScheduleMediation from './overview-schedule-mediation'
import { cn } from '@remio/design-system/lib/utils'

export default function OverviewScheduleMediations({
  className,
}: {
  className?: string
}) {
  const mediations = useAtomValue(overviewScheduleMediationsAtom)
  return (
    <div
      className={cn('flex flex-col overflow-y-auto flex-grow gap-2', className)}
    >
      {!!mediations?.data?.length ? (
        mediations?.data?.map((mediation) => (
          <OverviewScheduleMediation key={mediation.id} mediation={mediation} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">No mediations found</p>
        </div>
      )}
    </div>
  )
}
