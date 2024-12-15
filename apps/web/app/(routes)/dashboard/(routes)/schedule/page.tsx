import Schedule from '@remio/design-system/components/dashboard/schedule/schedule'
import { fetchMediations } from '@remio/design-system/actions/mediations/fetch-mediations'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'

export default async function page() {
  const currentDate = new Date()
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  // Get the first Monday of the month (or earlier if month starts mid-week)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  // Get the last Sunday of the month (or later if month ends mid-week)
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const mediations = await fetchMediations(startDate, endDate)

  return <Schedule mediations={mediations} />
}
