import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@remio/design-system/components/ui/dialog'
import { NoteWithMediation, MediationWithData } from '@remio/database'
import { useState } from 'react'
import NoteForm from './note-form'

export default function NoteEditDialog({
  mediation,
  note,
  redirect = false,
  children,
}: {
  mediation?: MediationWithData
  note?: NoteWithMediation
  redirect?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{note ? 'Edit Note' : 'Create Note'}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {note ? 'Edit a note for a mediation.' : 'Create a note.'}
        </DialogDescription>
        <NoteForm
          mediation={mediation}
          note={note}
          setIsOpen={setIsOpen}
          redirect={redirect}
        />
      </DialogContent>
    </Dialog>
  )
}
