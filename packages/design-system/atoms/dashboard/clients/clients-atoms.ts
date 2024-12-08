import { atom } from 'jotai'
import { Client } from '@remio/database/schema/clients'

export const clientsSearchAtoms = atom<string>('')
export const clientsAtoms = atom<Client[]>([])

export const clientsTableAtoms = atom<Client[]>((get) => {
  const search = get(clientsSearchAtoms)
  const clients = get(clientsAtoms)
  return clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  )
})
