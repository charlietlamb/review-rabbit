'use client'

import Calendar from '@rabbit/design-system/components/calendar/calendar'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'
import { useAtom } from 'jotai'
import {
  scheduleDateAtom,
  scheduleEventItemsAtom,
  scheduleModeAtom,
} from '@rabbit/design-system/atoms/dashboard/schedule/schedule-atoms'

export default function Schedule() {
  const [events, setEvents] = useAtom(scheduleEventItemsAtom)
  const [mode, setMode] = useAtom(scheduleModeAtom)
  const [date, setDate] = useAtom(scheduleDateAtom)
  return (
    <DashboardWrap title="Schedule" subtitle="Manage your automations">
      <Calendar
        events={events}
        setEvents={setEvents}
        mode={mode}
        setMode={setMode}
        date={date}
        setDate={setDate}
      />
    </DashboardWrap>
  )
}
