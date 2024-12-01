import { AnalyticsProvider } from '@ff/analytics'
import { env } from '@ff/env'
import { VercelToolbar } from '@vercel/toolbar/next'
import { Toaster } from '@ff/design-system/components/ui/sonner'
import { TooltipProvider } from '@ff/design-system/components/ui/tooltip'
import Providers from '@ff/design-system/components/providers/providers'
import OneTapProvider from '@ff/design-system/components/providers/one-tap-provider'

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
