import Auth from '@/components/auth/auth'
import { Header } from '@/components/site/header/header'
import SiteLayout from '@/components/site/site-layout'
import useAuth from '@/hooks/use-auth'
import useIsNotUser from '@/hooks/use-is-not-user'

export default async function page() {
  useIsNotUser(await useAuth())
  return (
    <SiteLayout>
      <div className="p-8">
        <Auth login={false} />
      </div>
    </SiteLayout>
  )
}
