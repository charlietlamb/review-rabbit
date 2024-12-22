import DashboardHeader from '@remio/design-system/components/dashboard/header/dashboard-header'
import DashboardSidebar from '@remio/design-system/components/dashboard/sidebar/dashboard-sidebar'
import SessionProvider from '@remio/design-system/components/providers/session-provider'
import { SidebarProvider } from '@remio/design-system/components/ui/sidebar'
import useAuth from '@remio/design-system/hooks/use-auth'
import useIsUser from '@remio/design-system/hooks/use-is-user'
import ThemeProvider from '@remio/design-system/components/providers/theme-provider'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useAuth()
  useIsUser(user)
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SidebarProvider className="flex w-full flex-grow bg-sidebar">
        <SessionProvider user={user}>
          <DashboardSidebar />
          <div className="w-full max-h-screen flex flex-col overflow-y-hidden bg-sidebar">
            <div className="w-full flex-grow flex flex-col md:border-l border-border md:rounded-l-lg overflow-y-hidden">
              <DashboardHeader />
              <div className="flex flex-col flex-grow overflow-y-hidden bg-background">
                {children}
              </div>
            </div>
          </div>
        </SessionProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
