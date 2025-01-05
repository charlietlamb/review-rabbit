import { task, wait } from '@trigger.dev/sdk/v3'
import { EmailTaskType } from '../types/email-type'
import { getReviewEmail } from '@rabbit/email/components/review-email'
import { sendEmail } from '@rabbit/email/actions/send-email'
import { getEnv } from '@rabbit/env'
export const sendEmailTask = task({
  id: 'send-email',
  maxDuration: 60,
  run: async (payload: EmailTaskType, { ctx }) => {
    const { to, subject, delayInMinutes } = payload

    if (delayInMinutes) {
      await wait.for({ minutes: delayInMinutes })
    }

    const component = getReviewEmail(payload)

    const status = await sendEmail(to, subject, component)

    return {
      status,
    }
  },
})
