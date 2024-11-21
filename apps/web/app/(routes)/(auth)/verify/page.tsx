import { VerifyEmail } from '@dubble/design-system/components/auth/verify/verify-email'
import SiteLayout from '@dubble/design-system/components/site/site-layout'

export default async function VerifyPage() {
  return (
    <SiteLayout>
      <VerifyEmail />
    </SiteLayout>
  )
}
