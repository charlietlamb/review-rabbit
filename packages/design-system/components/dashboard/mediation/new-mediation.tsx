import DashboardContentHeader from '../header/dashboard-content-header'
import NewMediationForm from './new-mediation-form'

export default function NewMediation() {
  return (
    <div className="flex flex-col">
      <DashboardContentHeader title="New" subtitle="Schedule a new mediation" />
      <NewMediationForm />
    </div>
  )
}
