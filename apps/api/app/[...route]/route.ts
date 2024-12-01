import { handle } from 'hono/vercel'
import app from '@ff/hono'
import { env } from '@ff/env'

export const runtime = 'nodejs'

// Handle preflight requests
export const OPTIONS = async (request: Request) => {
  const origin = request.headers.get('origin')
  const allowedOrigin =
    env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : env.NEXT_PUBLIC_WEB

  // Return response with CORS headers
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':
        origin === allowedOrigin ? origin : allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, Accept, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    },
  })
}

const handleWithCors = async (request: Request) => {
  const response = await handle(app)(request)
  const origin = request.headers.get('origin')
  const allowedOrigin =
    env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : env.NEXT_PUBLIC_WEB

  // Clone the response to add CORS headers
  const corsResponse = new Response(response.body, response)
  corsResponse.headers.set(
    'Access-Control-Allow-Origin',
    origin === allowedOrigin ? origin : allowedOrigin
  )
  corsResponse.headers.set('Access-Control-Allow-Credentials', 'true')
  corsResponse.headers.set('Vary', 'Origin')

  return corsResponse
}

export const GET = handleWithCors
export const POST = handleWithCors
export const PUT = handleWithCors
export const DELETE = handleWithCors
