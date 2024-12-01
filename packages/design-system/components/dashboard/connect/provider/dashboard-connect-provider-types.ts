import { Connect } from '@ff/database/schema/connects'
import { ProviderData } from '@ff/design-system/lib/providers'

export type DashboardConnectProviderContext = {
  provider: ProviderData
  connects: Connect[]
}
