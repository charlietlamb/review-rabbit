import { AppRouteHandler } from '@dubble/hono/lib/types'
import { CreateDubRoute, CreateDubTaskRoute } from './dub.routes'
import { HttpStatusCodes } from '@dubble/http'
import { ElevenLabsClient } from 'elevenlabs'
import { env } from '@dubble/env'
import { generatePresignedUrlFromPath } from '../s3/s3.logic'
import {
  PresignedUrlResponseError,
  PresignedUrlResponseOk,
} from '../s3/s3.types'
import { tasks } from '@dubble/database/schema/tasks'
import { db } from '@dubble/database'
import { v4 as uuidv4 } from 'uuid'
import { dubs } from '@dubble/database/schema/dubs'

const ELEVENLABS_URL = 'https://api.elevenlabs.io/'

const elevenlabs = new ElevenLabsClient({
  apiKey: env.ELEVENLABS_API_KEY,
})

export const createDub: AppRouteHandler<CreateDubRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  const { url, language, source, path, taskId, mediaId } = await c.req.json()
  let videoUrl = url

  if (source === 'user') {
    const response = await generatePresignedUrlFromPath(path)
    if (response.status === HttpStatusCodes.OK) {
      videoUrl = (response as PresignedUrlResponseOk).content.presignedUrl
    } else {
      return c.json(
        { error: (response as PresignedUrlResponseError).content.error },
        HttpStatusCodes.BAD_REQUEST
      )
    }
  }

  const response = await elevenlabs.dubbing.dubAVideoOrAnAudioFile({
    target_lang: language,
    source_url: videoUrl,
    watermark: true,
  })

  const dubUrl = `${ELEVENLABS_URL}v1/dubbing/${response.dubbing_id}/audio/${language}`

  try {
    await db.insert(dubs).values({
      userId: user.id,
      taskId,
      language,
      dubbingId: response.dubbing_id,
      dubUrl,
      mediaId,
    })
  } catch (e) {
    return c.json(
      { error: 'Failed to create dub' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
  return c.json({ dubbingId: response.dubbing_id }, HttpStatusCodes.OK)
}

export const createDubTask: AppRouteHandler<CreateDubTaskRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }
  const id = uuidv4()
  const { tokens } = await c.req.json()

  try {
    await db.insert(tasks).values({
      id,
      userId: user.id,
      tokens,
      status: 'incomplete',
    })
  } catch (e) {
    return c.json(
      { error: 'Failed to create task' },
      HttpStatusCodes.BAD_REQUEST
    )
  }

  return c.json({ taskId: id }, HttpStatusCodes.OK)
}
