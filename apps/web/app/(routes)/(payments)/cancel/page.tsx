import Cancel from '@rabbit/design-system/components/payments/cancel'
import SiteLayout from '@rabbit/design-system/components/site/site-layout'
import React from 'react'

export const dynamic = 'force-dynamic'

export default function page() {
  return (
    <SiteLayout>
      <Cancel />
    </SiteLayout>
  )
}
