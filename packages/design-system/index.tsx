import { AnalyticsProvider } from '@rabbit/analytics'
import { getEnv } from '@rabbit/env'
import { VercelToolbar } from '@vercel/toolbar/next'
import { Toaster } from '@rabbit/design-system/components/ui/sonner'
import { TooltipProvider } from '@rabbit/design-system/components/ui/tooltip'
import Providers from '@rabbit/design-system/components/providers/providers'
import OneTapProvider from '@rabbit/design-system/components/providers/one-tap-provider'

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
      {getEnv().NODE_ENV === 'development' && <VercelToolbar />}
    </AnalyticsProvider>
  </Providers>
)
