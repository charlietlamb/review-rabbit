import { ConnectProviders } from '@dubble/design-system/components/connect/connect-providers'
import { Separator } from '@dubble/design-system/components/ui/separator'

export default function ConnectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Connected Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Connect your accounts to enable additional features
        </p>
      </div>
      <Separator />
      <ConnectProviders />
    </div>
  )
}
