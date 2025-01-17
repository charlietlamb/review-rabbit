import { Pricing } from '@rabbit/design-system/components/site/pricing/pricing'
import SiteLayout from '@rabbit/design-system/components/site/site-layout'
import { getEnv } from '@rabbit/env'
export const dynamic = 'force-dynamic'

export default function PricingPage() {
  return (
    <SiteLayout>
      <Pricing isDevelopment={getEnv().NODE_ENV === 'development'} />
    </SiteLayout>
  )
}
