import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const uploadProfileImageSchema = z.object({
  file: zfd.file(),
  userId: z.string(),
})

export const uploadProfileImageResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
})
