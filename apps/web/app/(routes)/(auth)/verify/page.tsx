import { VerifyEmail } from '@/components/auth/verify/verify-email'
import SiteLayout from '@/components/site/site-layout'

export default async function VerifyPage() {
  return (
    <SiteLayout>
      <VerifyEmail />
    </SiteLayout>
  )
}
