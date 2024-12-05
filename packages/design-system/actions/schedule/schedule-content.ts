'use server'

import client from '@ff/design-system/lib/client'
import { headersWithCookies } from '@ff/design-system/lib/header-with-cookies'
import { createOptionTypes } from '@ff/design-system/components/dashboard/create/options/create-options-data'
import { providerIds } from '@ff/design-system/lib/providers'

interface ScheduleContent {
  type: (typeof createOptionTypes)[number]
  providerId: (typeof providerIds)[number]
  scheduledTime: string
  mediaUrl: string
  caption: string
}

export async function scheduleContent(content: ScheduleContent) {
  const response = await client.schedule[':providerId'][':type'].$post(
    {
      param: {
        providerId: content.providerId,
        type: content.type,
      },
      json: {
        scheduledTime: content.scheduledTime,
        mediaUrl: content.mediaUrl,
        caption: content.caption,
      },
    },
    await headersWithCookies()
  )
  if (!response.ok) {
    console.error(response)
    return null
  }

  return await response.json()
}
