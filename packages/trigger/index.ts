import { AutomationItemInsert } from '@rabbit/database/schema/app/automation-items'
import { MESSAGE_TYPES } from '@rabbit/design-system/components/flow/lib/types'
import { sendEmailTask } from './tasks/send-email-task'
import { Client } from '@rabbit/database/schema/app/clients'
import { Business } from '@rabbit/database/schema/app/businesses'

export function triggerAutomation(
  automationItem: AutomationItemInsert,
  client: Client,
  business: Business
) {
  console.log('triggering automation...')
  console.log(automationItem)
  switch (automationItem.method) {
    case MESSAGE_TYPES.EMAIL:
      sendEmailTask.trigger(
        {
          to: [client.email],
          subject: automationItem.content,
          delayInMinutes: automationItem.delayInMinutes,
          content: automationItem.content,
          client,
          business,
        },
        {
          ttl: automationItem.delayInMinutes,
        }
      )
      break
    case MESSAGE_TYPES.SMS:
      break
    case MESSAGE_TYPES.WHATSAPP:
      break
  }
}
