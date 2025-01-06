import { WorkflowItem } from '@rabbit/database/types/workflow-types'
import { MESSAGE_TYPES } from '@rabbit/design-system/components/flow/lib/types'
import { sendEmailTask } from './tasks/send-email-task'
import { Client } from '@rabbit/database/schema/app/clients'
import { Business } from '@rabbit/database/schema/app/businesses'
import { TASK_TTL } from './task-data'

export function triggerWorkflow(
  workflowItem: WorkflowItem,
  clients: Client[],
  business: Business
) {
  switch (workflowItem.method) {
    case MESSAGE_TYPES.EMAIL:
      sendEmailTask.batchTrigger(
        clients.map((client) => ({
          payload: {
            to: [client.email],
            subject: workflowItem.content,
            delayInMinutes: workflowItem.time,
            content: workflowItem.content,
            client,
            business,
          },
          options: {
            delay: `${workflowItem.time}m`,
            ttl: TASK_TTL,
          },
        }))
      )
      break
    case MESSAGE_TYPES.SMS:
      break
    case MESSAGE_TYPES.WHATSAPP:
      break
  }
}
