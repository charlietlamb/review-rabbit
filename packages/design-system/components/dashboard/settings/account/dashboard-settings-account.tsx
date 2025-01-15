import DashboadSettingsAccountForm from './dashboard-settings-account-form'
import DashboardSettingsAccountContent from './dashboard-settings-account-content'
import Theme from '../theme/theme'
import DashboardWrap from '@rabbit/design-system/components/dashboard/dashboard/dashboard-wrap'
import { Separator } from '@rabbit/design-system/components/ui/separator'

export default function DashboardSettingsAccount() {
  return (
    <DashboardWrap title="Account" subtitle="Manage your account settings">
      <div className="flex flex-col divide-y">
        <section className="px-4 pt-2 pb-4">
          <DashboadSettingsAccountForm />
        </section>

        <section className="px-4 pt-2 pb-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold font-heading">Security</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account security and verification
            </p>
          </div>
          <DashboardSettingsAccountContent />
        </section>

        <section className="px-4 pt-2 pb-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold font-heading">Appearance</h2>
            <p className="text-sm text-muted-foreground">
              Customize how Review Rabbit looks on your device
            </p>
          </div>
          <Theme showLabel={false} />
        </section>
      </div>
    </DashboardWrap>
  )
}
