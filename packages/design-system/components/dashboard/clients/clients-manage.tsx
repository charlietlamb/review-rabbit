'use client'

import { Client } from '@remio/database/schema/clients'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { clientsAtoms } from '@remio/design-system/atoms/dashboard/clients/clients-atoms'
import ClientsTable from './clients-table'

export default function ClientsManage({
  initialClients,
}: {
  initialClients: Client[]
}) {
  const setClients = useSetAtom(clientsAtoms)
  useEffect(() => {
    setClients(initialClients)
  }, [])
  return <ClientsTable />
}
