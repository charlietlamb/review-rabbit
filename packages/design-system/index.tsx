import { AnalyticsProvider } from '@remio/analytics'
import { env } from '@remio/env'
import { VercelToolbar } from '@vercel/toolbar/next'
import { Toaster } from '@remio/design-system/components/ui/sonner'
import { TooltipProvider } from '@remio/design-system/components/ui/tooltip'
import Providers from '@remio/design-system/components/providers/providers'
import OneTapProvider from '@remio/design-system/components/providers/one-tap-provider'

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
