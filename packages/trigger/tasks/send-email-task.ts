import { task } from '@trigger.dev/sdk/v3'
import { EmailTaskType } from '../types/email-type'
import { getReviewEmail } from '@rabbit/email/components/review-email'
import { sendEmailString } from '@rabbit/email/actions/send-email-string'
import { TASK_IDS } from '../task-data'

export const sendEmailTask = task({
  id: TASK_IDS.EMAIL,
  maxDuration: 60,
  run: async (payload: EmailTaskType, { ctx }) => {
    const { to, subject, content } = payload

    const component = getReviewEmail(payload)

    const status = await sendEmailString(to, subject, content)

    return {
      status,
    }
  },
})
