import { Failure } from '@rabbit/design-system/components/site/index/failure/failure'
import SiteLayout from '@rabbit/design-system/components/site/site-layout'

export const dynamic = 'force-dynamic'

export default function FailedPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  return (
    <SiteLayout>
      <Failure message={searchParams.message} />
    </SiteLayout>
  )
}
