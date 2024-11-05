import { auth } from '@/backend/auth'
import { plans } from '@/backend/src/lib/types'

declare global {
  type User = typeof auth.$Infer.Session.user
  type Session = typeof auth.$Infer.Session.session
  type Plan = (typeof plans)[number]
}
