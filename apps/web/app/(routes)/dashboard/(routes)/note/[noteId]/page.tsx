import { getNoteById } from '@remio/design-system/actions/notes/get-note-by-id'
import Note from '@remio/design-system/components/dashboard/note/note'

export default async function page({ params }: { params: { noteId: string } }) {
  const { noteId } = await params
  const note = await getNoteById(noteId)
  return <Note note={note} />
}
