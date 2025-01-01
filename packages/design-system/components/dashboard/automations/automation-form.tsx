import { Automation } from '@rabbit/database/schema/app/automations'
import { Client } from '@rabbit/database/schema/app/clients'
export default function AutomationForm({
  automation,
  onSuccess,
}: {
  automation?: Automation
  client?: Client
  onSuccess?: () => void
}) {
  return <div></div>
}
