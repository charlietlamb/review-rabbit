import DashboardHeader from '@/components/dashboard/header/dashboard-header'
import DashboardSidebar from '@/components/dashboard/sidebar/dashboard-sidebar'
import SessionProvider from '@/components/providers/session-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import useAuth from '@/hooks/use-auth'
import useIsUser from '@/hooks/use-is-user'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useAuth()
  useIsUser(user)
  return (
    <SidebarProvider className="flex w-full flex-grow">
      <SessionProvider user={user}>
        <DashboardSidebar />
        <div className="w-full max-h-screen flex flex-col overflow-hidden bg-background">
          <DashboardHeader />
          <div className="flex flex-col flex-grow overflow-hidden">
            {children}
          </div>
        </div>
      </SessionProvider>
    </SidebarProvider>
  )
}
