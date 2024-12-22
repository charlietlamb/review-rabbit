import { createRouter } from '@remio/hono/lib/create-app'
import * as routes from '@remio/hono/routes/notes/notes.routes'
import * as handlers from '@remio/hono/routes/notes/notes.handlers'

const router = createRouter()
  .openapi(routes.getNotes, handlers.getNotes)
  .openapi(routes.addNote, handlers.addNote)
  .openapi(routes.updateNote, handlers.updateNote)
  .openapi(routes.deleteNote, handlers.deleteNote)
  .openapi(routes.getNoteById, handlers.getNoteById)

export default router
