import { AnalyticsProvider } from '@burse/analytics'
import { env } from '@burse/env'
import { VercelToolbar } from '@vercel/toolbar/next'
import { Toaster } from '@burse/design-system/components/ui/sonner'
import { TooltipProvider } from '@burse/design-system/components/ui/tooltip'
import Providers from '@burse/design-system/components/providers/providers'
import OneTapProvider from '@burse/design-system/components/providers/one-tap-provider'

export const DesignSystemProvider = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Providers>
    <AnalyticsProvider>
      <TooltipProvider>
        <OneTapProvider>{children}</OneTapProvider>
      </TooltipProvider>
      <Toaster />
      {env.NODE_ENV === 'development' && <VercelToolbar />}
    </AnalyticsProvider>
  </Providers>
)
