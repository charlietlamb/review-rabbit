import { AnalyticsProvider } from '@dubble/analytics'
import { env } from '@dubble/env'
import { VercelToolbar } from '@vercel/toolbar/next'
import { Toaster } from '@dubble/design-system/components/ui/sonner'
import { TooltipProvider } from '@dubble/design-system/components/ui/tooltip'
import Providers from '@dubble/design-system/components/providers/providers'

export const DesignSystemProvider = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Providers>
    <AnalyticsProvider>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
      {env.NODE_ENV === 'development' && <VercelToolbar />}
    </AnalyticsProvider>
  </Providers>
)
