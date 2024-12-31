import { z } from 'zod'

export const paginationRequestSchema = z.object({
  offset: z.number(),
  limit: z.number(),
})

export type PaginationRequest = z.infer<typeof paginationRequestSchema>

export const idRequestSchema = z.object({
  id: z.string(),
})

export type IdRequest = z.infer<typeof idRequestSchema>
