import { z } from 'zod'
import { server } from './server'
import { client } from './client'

export const mainEnvSchema = z.object({
  ...server,
  ...client,
})
