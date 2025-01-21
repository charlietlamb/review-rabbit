import { envvars, task } from '@trigger.dev/sdk/v3'
import { EmailTaskType } from '../types/email-type'
import { sendEmailString } from '@rabbit/email/actions/send-email-string'
import { TASK_IDS } from '../task-data'

export const sendEmailTask = task({
  id: TASK_IDS.EMAIL,
  maxDuration: 60,
  run: async (payload: EmailTaskType & { demo: boolean }, { ctx }) => {
    const { to, subject, content, demo } = payload
    const projectId = ctx.project.id
    const environment = ctx.environment.id
    const resendApiKey = (
      await envvars.retrieve(projectId, environment, 'RESEND_API_KEY')
    ).value
    const triggerSecretKey = (
      await envvars.retrieve(projectId, environment, 'TRIGGER_SECRET_KEY')
    ).value
    const nextPublicApi = (
      await envvars.retrieve(projectId, environment, 'NEXT_PUBLIC_API')
    ).value

    const success = await sendEmailString(to, subject, content, resendApiKey)

    if (!demo) {
      const response = await fetch(
        `${nextPublicApi}/automations/items/update-status`,
        {
          method: 'POST',
          body: JSON.stringify({
            id: payload.automationItemId,
            status: success ? 'success' : 'failed',
            secretKey: triggerSecretKey,
          }),
        }
      )
    }
  },
})
