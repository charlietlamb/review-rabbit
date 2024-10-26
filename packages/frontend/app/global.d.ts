import type { selectUserSchema } from '../../backend/src/db/schema/users'
import { z } from 'zod'

declare global {
  type UserSchema = typeof selectUserSchema
  type User = z.infer<typeof selectUserSchema>
}
