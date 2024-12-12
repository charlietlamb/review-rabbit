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

export default function ScheduleCalendar() {
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
      <CalendarBody features={[]}>
        {({ feature }) => <CalendarItem key={feature.id} feature={feature} />}
      </CalendarBody>
    </CalendarProvider>
  )
}
