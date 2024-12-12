import DashboardContentHeader from '../header/dashboard-content-header'
import ScheduleCalendar from './schedule-calendar'

export default function Schedule() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Schedule"
        subtitle="Schedule your tasks and events"
      />
      <ScheduleCalendar />
    </div>
  )
}
