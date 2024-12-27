import Auth from '@burse/design-system/components/auth/auth'
import AuthLayout from '@burse/design-system/components/auth/auth-layout'
import { auth } from '@burse/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) return redirect('/dashboard')
  return (
    <AuthLayout>
      <Auth login={false} />
    </AuthLayout>
  )
}
