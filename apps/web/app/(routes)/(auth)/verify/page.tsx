import { VerifyEmail } from '@burse/design-system/components/auth/verify/verify-email'
import SiteLayout from '@burse/design-system/components/site/site-layout'

export default async function VerifyPage() {
  return (
    <SiteLayout>
      <VerifyEmail />
    </SiteLayout>
  )
}
