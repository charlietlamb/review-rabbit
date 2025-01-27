export type CalendarProps = {
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  mode: Mode
  setMode: (mode: Mode) => void
  date: Date
  setDate: (date: Date) => void
}

export type CalendarContextType = CalendarProps & {
  newEventSheetOpen: boolean
  setNewEventSheetOpen: (open: boolean) => void
  manageEventSheetOpen: boolean
  setManageEventSheetOpen: (open: boolean) => void
  selectedEvent: CalendarEvent | null
  setSelectedEvent: (event: CalendarEvent | null) => void
}

export type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
}

export const calendarModes = ['day', 'week', 'month'] as const
export type Mode = (typeof calendarModes)[number]
