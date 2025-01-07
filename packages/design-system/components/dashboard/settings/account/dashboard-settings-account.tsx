import DashboadSettingsAccountForm from './dashboard-settings-account-form'
import DashboardSettingsAccountContent from './dashboard-settings-account-content'
import Theme from '../theme/theme'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'

export default function DashboardSettingsAccount() {
  return (
    <DashboardWrap title="Account" subtitle="Manage your account settings">
      <DashboadSettingsAccountForm />
      <DashboardSettingsAccountContent />
      <div className="p-4">
        <Theme />
      </div>
    </DashboardWrap>
  )
}
