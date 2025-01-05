import SiteLayout from '@rabbit/design-system/components/site/site-layout'
import { TermsAndConditions } from '@rabbit/design-system/components/site/terms/terms-and-conditions'

export const dynamic = 'force-dynamic'

export default function TermsPage() {
  return (
    <SiteLayout>
      <TermsAndConditions />
    </SiteLayout>
  )
}
