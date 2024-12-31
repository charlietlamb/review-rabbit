import Auth from '@rabbit/design-system/components/auth/auth'
import AuthLayout from '@rabbit/design-system/components/auth/auth-layout'
import { auth } from '@rabbit/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) return redirect('/dashboard')
  return (
    <AuthLayout>
      <Auth login={true} />
    </AuthLayout>
  )
}
