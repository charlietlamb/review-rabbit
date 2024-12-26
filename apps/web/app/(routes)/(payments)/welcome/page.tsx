import Welcome from '@remio/design-system/components/payments/welcome'
import React from 'react'

export default function page({
  searchParams,
}: {
  searchParams: { plan: string }
}) {
  const { plan } = searchParams

  return <Welcome plan={plan} />
}
