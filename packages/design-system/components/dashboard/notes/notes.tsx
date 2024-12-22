'use client'

import DashboardContentHeader from '../header/dashboard-content-header'
import NotesTable from './notes-table'

export default function Invoices() {
  return (
    <div className="flex flex-col divide-y">
      <DashboardContentHeader
        title="Notes"
        subtitle="Create and manage notes for your mediations."
      />
      <div className="p-4">
        <NotesTable />
      </div>
    </div>
  )
}
