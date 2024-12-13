import Auth from '@remio/design-system/components/auth/auth'
import AuthLayout from '@remio/design-system/components/auth/auth-layout'
import { auth } from '@remio/auth'
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
