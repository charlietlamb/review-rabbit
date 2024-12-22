'use client'

import Tiptap from '@remio/design-system/components/tiptap/tiptap'
import { NoteWithMediation } from '@remio/database'
import { useState } from 'react'
import DashboardContentHeader from '../header/dashboard-content-header'
import { Button } from '@remio/design-system/components/ui/button'
import { updateNote } from '@remio/design-system/actions/notes/update-note'
import Spinner from '@remio/design-system/components/misc/spinner'
import { toast } from 'sonner'
import { SaveAll } from 'lucide-react'
import { useSetAtom } from 'jotai'
import { breadcrumbOverrideAtom } from '@remio/design-system/atoms/dashboard/breadcrumb/breadcrumb-atom'
import { useEffect } from 'react'

export default function Note({ note }: { note: NoteWithMediation }) {
  const [content, setContent] = useState<string>(note.content)
  const [isSaving, setIsSaving] = useState(false)
  const setBreadcrumb = useSetAtom(breadcrumbOverrideAtom)

  function handleSave() {
    setIsSaving(true)
    updateNote({ ...note, content }, note.id)
    toast.success('Note updated successfully.', {
      description: 'This has been saved.',
      icon: <SaveAll />,
    })
    setIsSaving(false)
  }

  useEffect(() => {
    setBreadcrumb(note.title)
  }, [note.title])

  return (
    <div className="flex flex-col h-full flex-grow relative">
      <div className="flex flex-col gap-4 h-full overflow-y-auto pb-20 divide-y">
        <DashboardContentHeader
          title={note.title}
          subtitle={`This note is associated with your mediation: ${note.mediation.title}`}
        />
        <div className="flex-grow">
          <Tiptap content={content} onChange={setContent} />
        </div>
      </div>
      <div className="absolute bottom-0 p-4 bg-background border-t w-full">
        <Button
          variant="shine"
          className="w-full"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? <Spinner /> : 'Save note'}
        </Button>
      </div>
    </div>
  )
}
