import Auth from '@remio/design-system/components/auth/auth'
import SiteLayout from '@remio/design-system/components/site/site-layout'
import { auth } from '@remio/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) return redirect('/dashboard')
  return (
    <SiteLayout>
      <div className="p-8">
        <Auth login={true} />
      </div>
    </SiteLayout>
  )
}
