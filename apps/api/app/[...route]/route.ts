import { handle } from 'hono/vercel'
import app from '@dubble/hono'

export const runtime = 'nodejs'

export const GET = handle(app)
export const POST = handle(app)
