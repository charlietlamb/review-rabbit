import Auth from '@/components/auth/Auth'
import Nav from '@/components/nav/Nav'
import useAuth from '@/hooks/use-auth'
import useIsNotUser from '@/hooks/use-is-not-user'

export default async function page() {
  useIsNotUser(await useAuth())
  return (
    <>
      <Nav />
      <div className="p-8">
        <Auth login={false} />
      </div>
    </>
  )
}
