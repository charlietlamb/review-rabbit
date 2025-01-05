import { logger, task, wait } from '@trigger.dev/sdk/v3'
import { EmailTaskType } from '../types/email-type'
import { getReviewEmail } from '@rabbit/email/components/review-email'
import { sendEmail } from '@rabbit/email/actions/send-email'

export const sendEmailTask = task({
  id: 'send-email',
  maxDuration: 60,
  run: async (payload: EmailTaskType, { ctx }) => {
    const { to, subject, body, delayInMinutes } = payload

    if (delayInMinutes) {
      await wait.for({ minutes: delayInMinutes })
    }

    const component = getReviewEmail('Test Email', 'https://www.google.com')

    const status = await sendEmail(to, subject, component)

    return {
      status,
    }
  },
})
