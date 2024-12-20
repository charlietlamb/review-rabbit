import { atom } from 'jotai'
import { Invoice, InvoiceWithClient } from '@remio/database/schema/invoices'

export const invoiceAtom = atom<InvoiceWithClient | null>(null)
