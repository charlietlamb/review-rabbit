import { WorkflowItem } from '@rabbit/database/types/workflow-types'
import { MESSAGE_TYPES } from '@rabbit/design-system/components/flow/lib/types'
import { sendEmailTask } from './tasks/send-email-task'
import { ClientAutomation } from './types/task-types'

export async function triggerWorkflow(
  workflowItem: WorkflowItem,
  clientsWithAutomationItemIds: ClientAutomation[]
) {
  switch (workflowItem.method) {
    case MESSAGE_TYPES.EMAIL:
      sendEmailTask.batchTrigger(
        clientsWithAutomationItemIds.map((clientWithAutomationItemId) => ({
          payload: {
            to: [clientWithAutomationItemId.client.email],
            subject: workflowItem.subject,
            content: workflowItem.content,
            client: clientWithAutomationItemId.client,
            automationItemId: clientWithAutomationItemId.automationItemId,
          },
          options: {
            delay: `${workflowItem.time}m`,
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
