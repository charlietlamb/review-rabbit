import Welcome from '@rabbit/design-system/components/payments/welcome'
import React from 'react'

export const dynamic = 'force-dynamic'

export default function page({
  searchParams,
}: {
  searchParams: { plan: string }
}) {
  const { plan } = searchParams

  return <Welcome plan={plan} />
}
