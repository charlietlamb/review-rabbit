'use server'

import { HttpStatusCodes } from '@dubble/http'
import client from '@/client'
import { headersWithCookies } from '@dubble/design-system/lib/header-with-cookies'
import { LanguageWithFlag } from '@dubble/design-system/types/language'

export default async function dub(
  media: Media[],
  languages: LanguageWithFlag[],
  tokens: number
) {
  const taskResponse = await client.dub.task.$post(
    {
      json: {
        tokens,
      },
    },
    await headersWithCookies()
  )

  if (taskResponse.status !== HttpStatusCodes.OK) {
    return HttpStatusCodes.INTERNAL_SERVER_ERROR
  }

  const { taskId } = await taskResponse.json()

  for (const l of languages) {
    for (const m of media) {
      await client.dub.$post(
        {
          json: {
            url: m.url,
            language: l.value,
            source: m.source,
            path:
              m.source === 'user' ? `media/${m.id}.${m.extension}` : undefined,
            taskId,
            mediaId: m.id,
          },
        },
        await headersWithCookies()
      )
    }
  }
}
