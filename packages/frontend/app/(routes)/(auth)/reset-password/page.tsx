import { getUserFromResetToken } from '@/actions/auth/reset-password/get-user-from-reset-token'
import { authClient } from '@/authClient'
import ResetPasswordForm from '@/components/auth/reset-password/reset-password-form'
import SiteLayout from '@/components/site/site-layout'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  //await is needed
  const { token } = await searchParams
  const user = await getUserFromResetToken(token)
  if (!user) {
    return notFound()
  }
  await authClient.useSession()
  return (
    <SiteLayout>
      <ResetPasswordForm token={token} />
    </SiteLayout>
  )
}
