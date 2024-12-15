'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import ScheduleCalendar from './schedule-calendar'
import { MediationWithData } from '@remio/database/schema/mediations'
import { useSetAtom } from 'jotai'
import { scheduleMediationsAtom } from '@remio/design-system/atoms/dashboard/schedule/schedule-atoms'
import { useEffect } from 'react'

export default function Schedule({
  mediations,
}: {
  mediations: MediationWithData[]
}) {
  const setMediations = useSetAtom(scheduleMediationsAtom)
  useEffect(() => {
    setMediations(mediations)
  }, [mediations, setMediations])

  return (
    <div className="flex flex-col divide-y overflow-hidden">
      <DashboardContentHeader
        title="Schedule"
        subtitle="Schedule your tasks and events"
      />
      <div className="overflow-y-auto">
        <ScheduleCalendar />
      </div>
    </div>
  )
}
