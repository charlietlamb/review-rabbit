import { atom } from 'jotai'
import { InvoiceWithClient } from '@remio/database'

export const invoicesSearchAtoms = atom<string>('')
export const invoicesAtoms = atom<InvoiceWithClient[]>([])

export const invoicesTableAtoms = atom<InvoiceWithClient[]>((get) => {
  const search = get(invoicesSearchAtoms)
  const invoices = get(invoicesAtoms)
  return invoices.filter((invoice) =>
    invoice.client.name.toLowerCase().includes(search.toLowerCase())
  )
})
