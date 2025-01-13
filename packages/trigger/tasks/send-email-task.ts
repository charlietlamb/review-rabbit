import { task } from '@trigger.dev/sdk/v3'
import { EmailTaskType } from '../types/email-type'
import { sendEmailString } from '@rabbit/email/actions/send-email-string'
import { TASK_IDS } from '../task-data'
import { getEnv } from '@rabbit/env'

export const sendEmailTask = task({
  id: TASK_IDS.EMAIL,
  maxDuration: 60,
  run: async (payload: EmailTaskType & { demo: boolean }, { ctx }) => {
    const { to, subject, content, demo } = payload

    const success = await sendEmailString(to, subject, content)

    if (!demo) {
      const response = await fetch(
        `${getEnv().NEXT_PUBLIC_API}/automations/items/update-status`,
        {
          method: 'POST',
          body: JSON.stringify({
            id: payload.automationItemId,
            status: success ? 'success' : 'failed',
            secretKey: getEnv().TRIGGER_SECRET_KEY,
          }),
        }
      )
    }
  },
})
