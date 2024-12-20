import { atom } from 'jotai'
import { MediationWithData } from '@remio/database/schema/mediations'
import { addMinutes } from 'date-fns'
import { CalendarEvent } from '@remio/design-system/components/calendar/calendar-types'

export const scheduleMediationsAtom = atom<MediationWithData[]>([])
export const scheduleEventsAtom = atom<CalendarEvent[]>((get) => {
  const mediations = get(scheduleMediationsAtom)
  return mediations
    .map((mediation) => ({
      id: mediation.id,
      title: mediation.title,
      start: mediation.date,
      end: addMinutes(mediation.date, mediation.duration),
      color: mediation.color,
    }))
    .sort((a, b) => {
      const dateComparison = a.start.getTime() - b.start.getTime()
      if (dateComparison !== 0) return dateComparison
      const aTime = a.start.getHours() * 60 + a.start.getMinutes()
      const bTime = b.start.getHours() * 60 + b.start.getMinutes()
      return aTime - bTime
    })
})
