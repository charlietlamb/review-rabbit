import type { selectUserSchema } from '@/backend/src/db/schema/users'
import { plans } from '@/backend/src/lib/types'
import { z } from 'zod'

declare global {
  type UserSchema = typeof selectUserSchema
  type User = z.infer<typeof selectUserSchema>
  type Plan = (typeof plans)[number]
}
