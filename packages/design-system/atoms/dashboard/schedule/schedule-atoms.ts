import { atom } from 'jotai'
import { AutomationItem } from '@rabbit/database/schema/app/automation-items'
import {
  CalendarEvent,
  Mode,
} from '@rabbit/design-system/components/calendar/calendar-types'
import { addMinutes } from 'date-fns'

export const scheduleDateAtom = atom<Date>(new Date())
export const scheduleAutomationItemsAtom = atom<AutomationItem[]>([])

export const scheduleEventItemsAtom = atom<CalendarEvent[]>((get) => {
  const automationItems = get(scheduleAutomationItemsAtom)
  const events = automationItems.map((automationItem) => {
    const start = addMinutes(
      automationItem.createdAt,
      automationItem.delayInMinutes
    )
    const end = addMinutes(start, 10)
    return {
      id: automationItem.id,
      title: automationItem.content,
      start,
      end,
      color: 'blue',
    }
  })
  return events
})

export const scheduleModeAtom = atom<Mode>('month')
