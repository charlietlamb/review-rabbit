import getUserDetails from '@/actions/auth/user/getUserDetails'
import DashboardHeader from '@/components/dashboard/header/DashboardHeader'
import DashboardProvider from '@/components/dashboard/provider/DashboardProvider'
import DashboardSidebar from '@/components/dashboard/sidebar/DashboardSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import useAuth from '@/hooks/use-auth'
import useIsUser from '@/hooks/use-is-user'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await useAuth()
  useIsUser(auth)
  if (!auth) return null
  const user = await getUserDetails(auth.id)
  if (!user) return null
  return (
    <DashboardProvider user={user}>
      <SidebarProvider className="flex w-full flex-grow">
        <DashboardSidebar />
        <div className="w-full">
          <DashboardHeader />
          <div className="p-4 flex flex-col">{children}</div>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  )
}
