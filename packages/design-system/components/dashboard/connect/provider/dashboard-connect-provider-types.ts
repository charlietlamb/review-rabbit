import { Connect } from '@dubble/database/schema/connects'
import { ProviderData } from '@dubble/design-system/lib/providers'

export type DashboardConnectProviderContext = {
  provider: ProviderData
  connects: Connect[]
}
