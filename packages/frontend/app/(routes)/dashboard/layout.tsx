import DashboardHeader from '@/components/dashboard/header/DashboardHeader'
import DashboardProvider from '@/components/dashboard/provider/DashboardProvider'
import DashboardSidebar from '@/components/dashboard/sidebar/DashboardSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import useAuth from '@/hooks/use-auth'
import useIsUser from '@/hooks/use-is-user'
import useJwt from '@/hooks/use-jwt'
import { JWTPayload } from 'jose'
import { JWTVerifyResult } from 'jose'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useAuth()
  const jwt = await useJwt()
  useIsUser(user)
  return (
    <DashboardProvider
      user={user as User}
      jwt={jwt as JWTVerifyResult<JWTPayload>}
    >
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
