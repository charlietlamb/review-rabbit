'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import { MediationWithData } from '@remio/database/schema/mediations'
import { useSetAtom } from 'jotai'
import { scheduleMediationsAtom } from '@remio/design-system/atoms/dashboard/schedule/schedule-atoms'
import { useEffect } from 'react'
import Calendar from '@remio/design-system/components/calendar/calendar'
import {
  Mode,
  CalendarEvent,
} from '@remio/design-system/components/calendar/calendar-types'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { scheduleEventsAtom } from '@remio/design-system/atoms/dashboard/schedule/schedule-atoms'

export default function Schedule({
  mediations,
}: {
  mediations: MediationWithData[]
}) {
  const setMediations = useSetAtom(scheduleMediationsAtom)
  useEffect(() => {
    setMediations(mediations)
  }, [mediations, setMediations])

  const mediationEvents = useAtomValue(scheduleEventsAtom)
  const [events, setEvents] = useState<CalendarEvent[]>(mediationEvents)
  const [mode, setMode] = useState<Mode>('day')
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    setEvents(mediationEvents)
    console.log(mediationEvents)
  }, [mediationEvents])

  return (
    <div className="flex flex-col divide-y overflow-hidden">
      <DashboardContentHeader
        title="Schedule"
        subtitle="Schedule your tasks and events"
      />
      <Calendar
        events={events}
        setEvents={setEvents}
        mode={mode}
        setMode={setMode}
        date={date}
        setDate={setDate}
      />
    </div>
  )
}
