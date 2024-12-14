import { Client } from '@remio/database/schema'
import {
  MediationClientDataForm,
  MediationDataForm,
} from 'components/dashboard/mediation/mediation-types'
import { atom } from 'jotai'

export const selectedClientsAtom = atom<Client[]>([])
export const clientsSelectSearchAtom = atom<string>('')
export const clientsSelectOptionsAtom = atom<Client[]>([])
export const mediationTabAtom = atom<'single' | 'multiple'>('single')
export const mediationAllClientsAtom = atom<MediationDataForm>({
  email: null,
  invoice: null,
})
export const mediationClientsAtom = atom<MediationClientDataForm[]>([])
