import { Separator } from '@/components/ui/separator'
import DashboardTitle from '../../title/dashboard-title'
import DashboadSettingsAccountForm from './dashboard-settings-account-form'

export default function DashboardSettingsAccount() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardTitle
        title="Account"
        description="Manage your account settings"
      />
      <Separator />
      <DashboadSettingsAccountForm />
    </div>
  )
}
