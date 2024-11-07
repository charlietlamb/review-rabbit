import { auth } from '@/backend/auth'
import { plans } from '@/backend/src/lib/types'
import { FormApi, ReactFormApi } from '@tanstack/react-form'
import { ZodValidator } from '@tanstack/zod-form-adapter'

declare global {
  type User = typeof auth.$Infer.Session.user
  type Session = typeof auth.$Infer.Session.session
  type Plan = (typeof plans)[number]
  type TanstackForm<T> = FormApi<T, ZodValidator> &
    ReactFormApi<T, ZodValidator>
}
