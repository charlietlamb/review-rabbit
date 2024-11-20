import Welcome from '@/components/payments/welcome'
import SiteLayout from '@/components/site/site-layout'
import React from 'react'

export default function page() {
  return (
    <SiteLayout>
      <Welcome />
    </SiteLayout>
  )
}
