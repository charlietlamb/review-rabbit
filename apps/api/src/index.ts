console.log('Starting worker initialization...')
console.log('Environment variables present:', Object.keys(process.env).length)
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('LOG_LEVEL:', process.env.LOG_LEVEL)

export { default } from '@rabbit/hono'
