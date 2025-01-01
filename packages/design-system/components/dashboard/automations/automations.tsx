import { Button } from '@rabbit/design-system/components/ui/button'
import DashboardContentHeader from '../header/dashboard-content-header'

export default function Automations() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Automations"
        subtitle="Manage and schedule your automations"
      />
      <div />
    </div>
  )
}
