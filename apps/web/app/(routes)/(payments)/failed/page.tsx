import { Failed } from '@rabbit/design-system/components/site/payments/failed'
import SiteLayout from '@rabbit/design-system/components/site/site-layout'
export const dynamic = 'force-dynamic'

export default function FailedPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  return (
    <SiteLayout>
      <Failed message={searchParams.message} />
    </SiteLayout>
  )
}
