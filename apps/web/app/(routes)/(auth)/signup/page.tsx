import Auth from '@rabbit/design-system/components/auth/auth'
import AuthLayout from '@rabbit/design-system/components/auth/auth-layout'
import { getAuth } from '@rabbit/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { env } from '@rabbit/env'

export default async function page() {
  const auth = getAuth(env)
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
