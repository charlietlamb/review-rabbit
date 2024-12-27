'use server'

import client from '@burse/design-system/lib/client'
import { redirect } from 'next/navigation'

export async function connectStripeRefresh(accountId: string) {
  const url = client.stripe.connect.refresh[':accountId'].$url({
    param: { accountId },
  })
  redirect(url.toString())
}
