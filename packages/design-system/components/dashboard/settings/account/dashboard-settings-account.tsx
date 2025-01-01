import DashboadSettingsAccountForm from './dashboard-settings-account-form'
import DashboardContentHeader from '../../header/dashboard-content-header'
import DashboardSettingsAccountContent from './dashboard-settings-account-content'
import Theme from '../theme/theme'

export default function DashboardSettingsAccount() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Account"
        subtitle="Manage your account settings"
      />
      <DashboadSettingsAccountForm />
      <DashboardSettingsAccountContent />
      <div className="p-4">
        <Theme />
      </div>
    </div>
  )
}
