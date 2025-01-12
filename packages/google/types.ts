import { z } from 'zod'

export const reviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  reviewId: z.string(),
  reviewer: z.object({
    displayName: z.string(),
    profilePhotoUrl: z.string().optional(),
  }),
  starRating: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
  comment: z.string(),
  createTime: z.string().transform((str) => new Date(str)),
  updateTime: z.string().transform((str) => new Date(str)),
  reviewReply: z
    .object({
      comment: z.string(),
      updateTime: z.string(),
    })
    .optional(),
})

export type Review = z.infer<typeof reviewSchema>
