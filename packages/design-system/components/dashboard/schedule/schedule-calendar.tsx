'use client'

import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from '@remio/design-system/components/roadmap-ui/calendar'
import { useAtomValue } from 'jotai'
import { scheduleFeaturesAtom } from '@remio/design-system/atoms/dashboard/schedule/schedule-atoms'
import ScheduleItemSheet from './schedule-item-sheet'
export default function ScheduleCalendar() {
  const features = useAtomValue(scheduleFeaturesAtom)
  return (
    <CalendarProvider>
      <CalendarDate>
        <div className="flex flex-col sm:items-center justify-between sm:flex-row w-full">
          <CalendarDatePicker>
            <CalendarMonthPicker />
            <CalendarYearPicker start={2024} end={2025} />
          </CalendarDatePicker>
          <CalendarDatePagination />
        </div>
      </CalendarDate>
      <CalendarHeader />
      <CalendarBody features={features}>
        {({ feature }) => (
          <ScheduleItemSheet key={feature.id}>
            <CalendarItem feature={feature} />
          </ScheduleItemSheet>
        )}
      </CalendarBody>
    </CalendarProvider>
  )
}
