'use client'

import { useEffect } from 'react'
import DashboardContentHeader from '../header/dashboard-content-header'
import MediationForm from './mediation-form'
import { Client } from '@remio/database/schema/clients'
import { clientsSelectOptionsAtom } from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'
import { useSetAtom } from 'jotai'

export default function NewMediation({ clients }: { clients: Client[] }) {
  const setClients = useSetAtom(clientsSelectOptionsAtom)

  useEffect(() => {
    setClients(clients)
  }, [clients])

  return (
    <div className="flex flex-col overflow-y-auto divide-y">
      <DashboardContentHeader
        title="New Mediation"
        subtitle="Schedule a new mediation"
      />
      <div className="overflow-y-auto">
        <MediationForm />
      </div>
    </div>
  )
}
