import { task } from '@trigger.dev/sdk/v3'
import { EmailTaskType } from '../types/email-type'
import { sendEmailString } from '@rabbit/email/actions/send-email-string'
import { TASK_IDS } from '../task-data'
import { getEnv } from '@rabbit/env'

export const sendEmailTask = task({
  id: TASK_IDS.EMAIL,
  maxDuration: 60,
  run: async (payload: EmailTaskType, { ctx }) => {
    const { to, subject, content } = payload

    const success = await sendEmailString(to, subject, content)

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
  },
})
