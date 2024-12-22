'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import NoteEditDialog from './note-edit-dialog'
import NotesTable from './notes-table'
import { Button } from '@remio/design-system/components/ui/button'

export default function Notes() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Notes"
        subtitle="Create and manage notes for your mediations."
        right={
          <NoteEditDialog redirect>
            <Button variant="shine" className="ml-auto">
              Create note
            </Button>
          </NoteEditDialog>
        }
      />
      <div className="p-4">
        <NotesTable />
      </div>
    </div>
  )
}
