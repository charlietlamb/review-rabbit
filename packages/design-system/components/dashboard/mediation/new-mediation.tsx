import DashboardContentHeader from '../header/dashboard-content-header'
import NewMediationForm from './new-mediation-form'

export default function NewMediation() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="New Mediation"
        subtitle="Schedule a new mediation"
      />
      <div className="p-4">
        <NewMediationForm />
      </div>
    </div>
  )
}
