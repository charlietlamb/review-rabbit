import { atom } from 'jotai'
import { ClientWithReviewMatches } from '@rabbit/database/schema/app/clients'
import { DateRange } from 'react-day-picker'
import { ClientsChart } from '@rabbit/design-system/components/dashboard/clients/client-types'
import { subDays } from 'date-fns'

export const clientsSearchAtom = atom<string>('')
export const clientsAtoms = atom<ClientWithReviewMatches[]>([])
export const clientsSelectedAtoms = atom<ClientWithReviewMatches[]>([])
export const clientsChartData = atom<ClientsChart | undefined>(undefined)
export const clientsDateRange = atom<DateRange | undefined>({
  from: subDays(new Date(), 30),
  to: new Date(),
})
