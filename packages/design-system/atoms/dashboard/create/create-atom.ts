import { atom } from 'jotai'
import { CreateOptionData } from '@dubble/design-system/components/dashboard/create/options/create-options-data'
import { Connect } from '@dubble/database/schema/connects'
import {
  Provider,
  ProviderData,
  providerDataById,
} from '@dubble/design-system/lib/providers'

export const createTypeAtom = atom<CreateOptionData | null>(null)
export const createFilesAtom = atom<File[]>([])
export const createConnectsAtom = atom<Connect[]>([])
export const createSelectedConnectsAtom = atom<Connect[]>([])
export const createSelectedProvidersAtom = atom<ProviderData[]>((get) => {
  const connects = get(createSelectedConnectsAtom)
  const uniqueProviders = new Set(connects.map((connect) => connect.providerId))
  return Array.from(uniqueProviders).map((id) => providerDataById[id])
})
export const createTextPlatformAtom = atom<boolean>(false)
export const createCaptionAtom = atom<string>('')
export const createSelectedCaptionProviderAtom = atom<Provider | null>(null)
export const createCaptionPlatformAtom = atom<Map<Provider, string>>(new Map())
