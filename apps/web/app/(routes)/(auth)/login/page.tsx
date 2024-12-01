import Auth from '@ff/design-system/components/auth/auth'
import SiteLayout from '@ff/design-system/components/site/site-layout'
import { auth } from '@ff/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) return redirect('/')
  return (
    <SiteLayout>
      <div className="p-8">
        <Auth login={true} />
      </div>
    </SiteLayout>
  )
}
