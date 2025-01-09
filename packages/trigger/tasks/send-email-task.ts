import { task } from '@trigger.dev/sdk/v3'
import { EmailTaskType } from '../types/email-type'
import { sendEmailString } from '@rabbit/email/actions/send-email-string'
import { TASK_IDS } from '../task-data'
import { updateAutomationItem } from '@rabbit/design-system/actions/automations/update-automation-item'

export const sendEmailTask = task({
  id: TASK_IDS.EMAIL,
  maxDuration: 60,
  run: async (payload: EmailTaskType, { ctx }) => {
    const { to, subject, content } = payload

    const success = await sendEmailString(to, subject, content)

    if (success) {
      await updateAutomationItem(
        {
          status: 'success',
        },
        payload.automationItemId
      )
    } else {
      await updateAutomationItem(
        {
          status: 'failed',
        },
        payload.automationItemId
      )
    }
  },
})
