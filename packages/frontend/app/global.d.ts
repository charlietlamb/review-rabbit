import type { selectUserSchema } from '@/backend/src/db/schema/users'
import { updateUserSchema } from '@/backend/src/routes/user/schema'
import { z } from 'zod'

declare global {
  type UserSchema = typeof selectUserSchema
  type User = z.infer<typeof selectUserSchema>
  type UpdateUserSchema = typeof updateUserSchema
  type UpdateUser = z.infer<typeof updateUserSchema>
}
