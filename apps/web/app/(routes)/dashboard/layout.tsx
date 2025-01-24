import DashboardHeader from '@rabbit/design-system/components/dashboard/header/dashboard-header'
import DashboardSidebar from '@rabbit/design-system/components/dashboard/sidebar/dashboard-sidebar'
import SessionProvider from '@rabbit/design-system/components/providers/session-provider'
import { SidebarProvider } from '@rabbit/design-system/components/ui/sidebar'
import Onboarding from '@rabbit/design-system/components/dashboard/onboarding/onboarding'
import { getStripeDetails } from '@rabbit/stripe/lib/get-stripe-details'
import AppProvider from '@rabbit/design-system/components/providers/app-provider'
import { redirect } from 'next/navigation'
import { authSingleton as auth } from '@rabbit/auth/auth-singleton'
import { headers } from 'next/headers'
import { AuthSession, AuthUser } from '@rabbit/auth'
import { env } from '@rabbit/env'
import { betterFetch } from '@better-fetch/fetch'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = await betterFetch<{
    session: AuthSession
    user: AuthUser
  }>('/api/auth/get-session', {
    baseURL: env.NEXT_PUBLIC_API,
    headers: {
      cookie: (await headers()).get('cookie') || '',
    },
  })
  if (!session) {
    return redirect('/login')
  }
  const { user } = session
  const stripeDetails = await getStripeDetails(user.id)
  return (
    <SessionProvider user={user} account={null} stripeDetails={stripeDetails}>
      <AppProvider>
        <SidebarProvider className="flex w-full flex-grow">
          <div className="w-full h-screen flex overflow-hidden bg-background relative">
            {user && !user.onboardingCompleted && false && (
              <Onboarding user={user} />
            )}
            <DashboardSidebar />
            <div className="w-full flex-grow flex flex-col overflow-hidden relative">
              <DashboardHeader />
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
