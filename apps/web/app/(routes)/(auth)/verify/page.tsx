import { VerifyEmail } from '@ff/design-system/components/auth/verify/verify-email'
import SiteLayout from '@ff/design-system/components/site/site-layout'

export default async function VerifyPage() {
  return (
    <SiteLayout>
      <VerifyEmail />
    </SiteLayout>
  )
}
