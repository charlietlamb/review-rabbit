import DashboardHeader from '@burse/design-system/components/dashboard/header/dashboard-header'
import DashboardSidebar from '@burse/design-system/components/dashboard/sidebar/dashboard-sidebar'
import SessionProvider from '@burse/design-system/components/providers/session-provider'
import { SidebarProvider } from '@burse/design-system/components/ui/sidebar'
import useAuth from '@burse/design-system/hooks/use-auth'
import useIsUser from '@burse/design-system/hooks/use-is-user'
import ThemeProvider from '@burse/design-system/components/providers/theme-provider'
import Onboarding from '@burse/design-system/components/dashboard/onboarding/onboarding'
import CustomThemeProvider from '@burse/design-system/components/providers/custom-theme-provider'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useAuth()
  useIsUser(user)
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <CustomThemeProvider>
        <SessionProvider user={user}>
          <SidebarProvider className="flex w-full flex-grow">
            <div className="w-full h-screen flex flex-col overflow-hidden bg-background relative">
              {user && !user.onboardingCompleted && <Onboarding user={user} />}
              <DashboardHeader />
              <div className="w-full flex-grow flex overflow-hidden divide-x relative">
                <DashboardSidebar />
                <div className="flex flex-col flex-grow overflow-y-auto bg-background">
                  {children}
                </div>
              </div>
            </div>
          </SidebarProvider>
        </SessionProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  )
}
