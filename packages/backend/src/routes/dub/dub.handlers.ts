import { AppRouteHandler } from '@/src/lib/types'
import { CreateDubRoute } from './dub.routes'
import { HttpStatusCodes } from '@/src/http'
import { ElevenLabsClient } from 'elevenlabs'
import env from '@/src/env'

const elevenlabs = new ElevenLabsClient({
  apiKey: env.ELEVENLABS_API_KEY,
})

export const createDub: AppRouteHandler<CreateDubRoute> = async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, HttpStatusCodes.UNAUTHORIZED)
  }

  // Parse body
  const body = await c.req.json()
  const response = await elevenlabs.dubbing.dubAVideoOrAnAudioFile({
    target_lang: body.language,
    source_url: body.url,
  })

  if (response.dubbing_id) {
    return c.json({ dubbingId: response.dubbing_id }, HttpStatusCodes.OK)
  } else {
    return c.json(
      { error: 'Failed to create dub' },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}
