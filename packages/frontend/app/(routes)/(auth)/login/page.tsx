import Auth from '@/components/auth/auth'
import { Header } from '@/components/header/header'
import useAuth from '@/hooks/use-auth'
import useIsNotUser from '@/hooks/use-is-not-user'

export default async function page() {
  useIsNotUser(await useAuth())
  return (
    <>
      <Header />
      <div className="p-8">
        <Auth login={true} />
      </div>
    </>
  )
}
