import Auth from '@dubble/design-system/components/auth/auth'
import SiteLayout from '@dubble/design-system/components/site/site-layout'
import useAuth from '@dubble/design-system/hooks/use-auth'
import useIsNotUser from '@dubble/design-system/hooks/use-is-not-user'

export default async function page() {
  useIsNotUser(await useAuth())
  return (
    <SiteLayout>
      <div className="p-8">
        <Auth login={true} />
      </div>
    </SiteLayout>
  )
}
