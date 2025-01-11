import DashboardSidebar from '@rabbit/design-system/components/dashboard/sidebar/dashboard-sidebar'
import SessionProvider from '@rabbit/design-system/components/providers/session-provider'
import { SidebarProvider } from '@rabbit/design-system/components/ui/sidebar'
import useAuth from '@rabbit/design-system/hooks/use-auth'
import useIsUser from '@rabbit/design-system/hooks/use-is-user'
import Onboarding from '@rabbit/design-system/components/dashboard/onboarding/onboarding'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useAuth()
  useIsUser(user)
  return (
    <SessionProvider user={user}>
      <SidebarProvider className="flex w-full flex-grow">
        <div className="w-full h-screen flex flex-col overflow-hidden bg-background relative">
          {user && !user.onboardingCompleted && false && (
            <Onboarding user={user} />
          )}
          <div className="w-full flex-grow flex overflow-hidden divide-x relative">
            <DashboardSidebar />
            <div className="flex flex-col flex-grow overflow-y-auto bg-background">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  )
}
