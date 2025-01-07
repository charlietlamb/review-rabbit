import { CalendarContext } from './calendar-context'
import { CalendarEvent, Mode } from './calendar-types'
import { useState } from 'react'
import CalendarNewEventSheet from './sheet/calendar-new-event-sheet'
import CalendarManageEventSheet from './sheet/calendar-manage-event-sheet'

export default function CalendarProvider({
  events,
  setEvents,
  mode,
  setMode,
  date,
  setDate,
  children,
}: {
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  mode: Mode
  setMode: (mode: Mode) => void
  date: Date
  setDate: (date: Date) => void
  children: React.ReactNode
}) {
  const [newEventSheetOpen, setNewEventSheetOpen] = useState(false)
  const [manageEventSheetOpen, setManageEventSheetOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        mode,
        setMode,
        date,
        setDate,
        newEventSheetOpen,
        setNewEventSheetOpen,
        manageEventSheetOpen,
        setManageEventSheetOpen,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      <CalendarNewEventSheet />
      <CalendarManageEventSheet />
      {children}
    </CalendarContext.Provider>
  )
}
