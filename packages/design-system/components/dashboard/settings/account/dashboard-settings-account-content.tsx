import DashboardSettingsAccountEmailVerification from './dashboard-settings-account-email-verification'
import UpdatePassword from '@rabbit/design-system/components/auth/update-password/update-password'

export default function DashboardSettingsAccountContent() {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <DashboardSettingsAccountEmailVerification />
      <UpdatePassword />
    </div>
  )
}
