import DashboadSettingsAccountForm from './dashboard-settings-account-form'
import DashboardContentHeader from '../../header/dashboard-content-header'

export default function DashboardSettingsAccount() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Account"
        subtitle="Manage your account settings"
      />
      <DashboadSettingsAccountForm />
    </div>
  )
}
