import app from '@rabbit/hono'

app.get('/', (c) => c.text('Hono!'))

export default app
