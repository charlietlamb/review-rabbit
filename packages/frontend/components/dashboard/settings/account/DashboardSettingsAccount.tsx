import { Separator } from '@/components/ui/separator'
import DashboardTitle from '../../title/DashboardTitle'
import DashboadSettingsAccountForm from './DashboadSettingsAccountForm'

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
