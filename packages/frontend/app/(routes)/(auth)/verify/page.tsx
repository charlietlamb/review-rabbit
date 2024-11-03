import { verifyEmail } from '@/actions/auth/email/verify-email'
import { VerifyEmail } from '@/components/auth/verify/verify-email'
import SiteLayout from '@/components/site/site-layout'
import { redirect } from 'next/navigation'

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  //need await
  const { token } = await searchParams
  if (!token) {
    return redirect('/')
  }
  await verifyEmail(token)
  return (
    <SiteLayout>
      <VerifyEmail />
    </SiteLayout>
  )
}
