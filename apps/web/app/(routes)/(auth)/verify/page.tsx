import { VerifyEmail } from '@rabbit/design-system/components/auth/verify/verify-email'
import SiteLayout from '@rabbit/design-system/components/site/site-layout'

export const dynamic = 'force-dynamic'

export default async function VerifyPage() {
  return (
    <SiteLayout>
      <VerifyEmail />
    </SiteLayout>
  )
}
