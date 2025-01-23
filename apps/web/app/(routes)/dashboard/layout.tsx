import DashboardHeader from '@rabbit/design-system/components/dashboard/header/dashboard-header'
import DashboardSidebar from '@rabbit/design-system/components/dashboard/sidebar/dashboard-sidebar'
import SessionProvider from '@rabbit/design-system/components/providers/session-provider'
import { SidebarProvider } from '@rabbit/design-system/components/ui/sidebar'
import useAuth from '@rabbit/design-system/hooks/use-auth'
import Onboarding from '@rabbit/design-system/components/dashboard/onboarding/onboarding'
import { getStripeDetails } from '@rabbit/stripe/lib/get-stripe-details'
import AppProvider from '@rabbit/design-system/components/providers/app-provider'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  console.log('headersList', headersList)
  const user = await useAuth()
  if (!user) {
    return redirect('/login')
  }
  const stripeDetails = await getStripeDetails(user.id)
  return (
    <SessionProvider user={user} account={null} stripeDetails={stripeDetails}>
      <AppProvider>
        <SidebarProvider className="flex w-full flex-grow">
          <div className="w-full h-screen flex flex-col overflow-hidden bg-background relative">
            {user && !user.onboardingCompleted && false && (
              <Onboarding user={user} />
            )}
            <DashboardHeader />
            <div className="w-full flex-grow flex overflow-hidden relative">
              <DashboardSidebar />
              <div className="flex flex-col flex-grow overflow-y-auto bg-background">
                {children}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </AppProvider>
    </SessionProvider>
  )
}
