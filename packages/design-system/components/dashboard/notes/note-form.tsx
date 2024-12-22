import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Type, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '@remio/design-system/components/ui/button'
import Spinner from '@remio/design-system/components/misc/spinner'
import { FormContext } from '@remio/design-system/components/form/form-context'
import { useRouter } from 'next/navigation'
import { cn } from '@remio/design-system/lib/utils'
import { noteFormSchema, NoteForm as NoteFormType } from './note-types'
import { Note } from '@remio/database'
import { MediationWithData } from '@remio/database/schema/mediations'
import { updateNote } from '@remio/design-system/actions/notes/update-note'
import { addNote } from '@remio/design-system/actions/notes/add-note'
import MediationSelect from '../mediation/mediation-select'
import InputWithIcon from '@remio/design-system/components/form/input/input-with-icon'
import { deleteNote } from '@remio/design-system/actions/notes/delete-note'
import { v4 as uuidv4 } from 'uuid'

export default function NoteForm({
  note,
  mediation,
  setIsOpen,
  redirect = false,
  onDelete,
  className,
}: {
  note?: Note
  mediation?: MediationWithData
  setIsOpen?: (isOpen: boolean) => void
  redirect?: boolean
  onDelete?: () => void
  className?: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [attemptSubmitted, setAttemptSubmitted] = useState<boolean>(false)
  const [selectedMediation, setSelectedMediation] =
    useState<MediationWithData | null>(mediation || null)

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      id: note?.id || uuidv4(),
      title: note?.title || '',
      content: note?.content || '',
      mediationId: note?.mediationId || mediation?.id || '',
    } as NoteFormType,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setAttemptSubmitted(true)
      const success = note
        ? await updateNote(value, note.id)
        : await addNote(value)
      if (!success) {
        toast.error('Something went wrong.', {
          description: 'Please try again later.',
        })
      } else {
        toast.success(
          note ? 'Note updated successfully.' : 'Note added successfully.',
          {
            description: 'This has been saved.',
            icon: <UserCheck />,
          }
        )
        router.refresh()
        if (!note && redirect) router.push(`/dashboard/notes/${value.id}`)
      }
      setIsLoading(false)
      setIsOpen?.(false)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: noteFormSchema,
    },
  })
  return (
    <FormContext.Provider value={{ attemptSubmitted }}>
      <form className={cn(className, 'flex flex-col w-full gap-4 mx-auto')}>
        <div className="flex flex-col gap-4">
          <InputWithIcon
            form={form}
            name="title"
            label="Title"
            placeholder="Title"
            icon={<Type />}
            type="text"
            required
          />
          <MediationSelect
            form={form}
            selectedMediation={selectedMediation}
            setSelectedMediation={setSelectedMediation}
          />
        </div>
        <div className="flex gap-2">
          {note && (
            <Button
              className="font-heading w-full font-bold"
              disabled={isDeleting}
              colors="destructive"
              onClick={async () => {
                setIsDeleting(true)
                const success = await deleteNote(note.id)
                if (success) {
                  toast.success('Note deleted successfully.', {
                    description: 'You can always add them back later.',
                  })
                  router.refresh()
                  if (setIsOpen) setIsOpen(false)
                } else {
                  toast.error('Something went wrong.', {
                    description: 'Please try again later.',
                  })
                }
                setIsDeleting(false)
                onDelete?.()
              }}
            >
              {isDeleting ? <Spinner /> : 'Delete Note'}
            </Button>
          )}
          <Button
            className="w-full"
            disabled={isLoading}
            variant="shine"
            colors="none"
            onClick={(e) => {
              setAttemptSubmitted(true)
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            {isLoading ? <Spinner /> : note ? 'Update Note' : 'Add Note'}
          </Button>
        </div>
      </form>
    </FormContext.Provider>
  )
}
