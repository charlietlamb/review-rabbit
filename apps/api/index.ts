import app from '@remio/hono'

app.get('/', (c) => c.text('Hono!'))

export default app
