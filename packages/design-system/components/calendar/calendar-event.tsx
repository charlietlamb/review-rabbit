import { CalendarEvent as CalendarEventType } from '@remio/design-system/components/calendar/calendar-types'
import { useCalendarContext } from '@remio/design-system/components/calendar/calendar-context'
import { format, isSameDay } from 'date-fns'
import { cn } from '@remio/design-system/lib/utils'

interface EventPosition {
  left: string
  width: string
  top: string
  height: string
}

function getOverlappingEvents(
  currentEvent: CalendarEventType,
  events: CalendarEventType[]
): CalendarEventType[] {
  return events.filter((event) => {
    if (event.id === currentEvent.id) return false
    return (
      ((currentEvent.start < event.end && currentEvent.end > event.start) ||
        (currentEvent.start.getTime() === event.start.getTime() &&
          currentEvent.end.getTime() === event.end.getTime())) &&
      isSameDay(currentEvent.start, event.start)
    )
  })
}

function calculateEventPosition(
  event: CalendarEventType,
  allEvents: CalendarEventType[]
): EventPosition {
  const overlappingEvents = getOverlappingEvents(event, allEvents)

  // Sort events by start time and then by id to ensure consistent ordering
  const group = [event, ...overlappingEvents].sort((a, b) => {
    const timeComparison = a.start.getTime() - b.start.getTime()
    if (timeComparison === 0) {
      return a.id.localeCompare(b.id)
    }
    return timeComparison
  })

  const position = group.indexOf(event)
  const width = `${100 / (overlappingEvents.length + 1)}%`
  const left = `${(position * 100) / (overlappingEvents.length + 1)}%`

  const startHour = event.start.getHours()
  const startMinutes = event.start.getMinutes()

  let endHour = event.end.getHours()
  let endMinutes = event.end.getMinutes()

  if (!isSameDay(event.start, event.end)) {
    endHour = 23
    endMinutes = 59
  }

  const topPosition = startHour * 128 + (startMinutes / 60) * 128
  const duration = endHour * 60 + endMinutes - (startHour * 60 + startMinutes)
  const height = (duration / 60) * 128

  return {
    left,
    width,
    top: `${topPosition}px`,
    height: `${height}px`,
  }
}

export default function CalendarEvent({
  event,
  month = false,
  className,
}: {
  event: CalendarEventType
  month?: boolean
  className?: string
}) {
  const { events, setSelectedEvent, setManageEventSheetOpen } =
    useCalendarContext()

  const style = month ? {} : calculateEventPosition(event, events)

  return (
    <div
      key={event.id}
      className={cn(
        `px-3 py-1.5 rounded-md truncate cursor-pointer transition-all duration-300 bg-${event.color}-500/10 hover:bg-${event.color}-500/20 border border-${event.color}-500`,
        !month && 'absolute',
        className
      )}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedEvent(event)
        setManageEventSheetOpen(true)
      }}
    >
      <div
        className={cn(
          `flex flex-col w-full text-${event.color}-500`,
          month && 'flex-row items-center justify-between'
        )}
      >
        <p className={cn('font-bold truncate', month && 'text-xs')}>
          {event.title}
        </p>
        <p className={cn('text-sm', month && 'text-xs')}>
          <span>{format(event.start, 'h:mm a')}</span>
          <span className={cn('mx-1', month && 'hidden')}>-</span>
          <span className={cn(month && 'hidden')}>
            {format(event.end, 'h:mm a')}
          </span>
        </p>
      </div>
    </div>
  )
}
