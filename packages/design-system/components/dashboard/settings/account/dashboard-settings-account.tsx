import { Separator } from '@ff/design-system/components/ui/separator'
import DashboardTitle from '../../title/dashboard-title'
import DashboadSettingsAccountForm from './dashboard-settings-account-form'

export default function DashboardSettingsAccount() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardTitle
        title="Account"
        description="Manage your account settings"
      />
      <DashboadSettingsAccountForm />
    </div>
  )
}
