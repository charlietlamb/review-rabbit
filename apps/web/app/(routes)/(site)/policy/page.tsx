import { PrivacyPolicy } from '@rabbit/design-system/components/site/policy/privacy-policy'
import SiteLayout from '@rabbit/design-system/components/site/site-layout'

export const dynamic = 'force-dynamic'

export default function PolicyPage() {
  return (
    <SiteLayout>
      <PrivacyPolicy />
    </SiteLayout>
  )
}
