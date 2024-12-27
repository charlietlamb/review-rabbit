import app from '@burse/hono'

app.get('/', (c) => c.text('Hono!'))

export default app
