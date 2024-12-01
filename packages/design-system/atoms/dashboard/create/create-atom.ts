import { atom } from 'jotai'
import { CreateOptionData } from '@ff/design-system/components/dashboard/create/options/create-options-data'
import { Connect } from '@ff/database/schema/connects'
import {
  Provider,
  ProviderData,
  providerDataById,
} from '@ff/design-system/lib/providers'
import { Media } from '@ff/database/schema/media'
import { CreateFile } from 'components/dashboard/create/form/types/create-form-types'

export const createTypeAtom = atom<CreateOptionData | null>(null)

export const createFilesAtom = atom<CreateFile[]>([])
export const createAudioFilesAtom = atom<CreateFile[]>([])

export const createSelectedMediaAtom = atom<Media[]>([])

export const createConnectsAtom = atom<Connect[]>([])
export const createSelectedConnectsAtom = atom<Connect[]>([])

export const createAudioAtom = atom<string>('')

export const createSelectedProvidersAtom = atom<ProviderData[]>((get) => {
  const connects = get(createSelectedConnectsAtom)
  const uniqueProviders = new Set(connects.map((connect) => connect.providerId))
  return Array.from(uniqueProviders).map((id) => providerDataById[id])
})

export const createTextPlatformAtom = atom<boolean>(false)

export const createCaptionAtom = atom<string>('')
export const createSelectedCaptionProviderAtom = atom<Provider | null>(null)
export const createCaptionPlatformAtom = atom<Map<Provider, string>>(new Map())

export const createThumbnailTimeAtom = atom<number>(0)

export const createScheduleAtom = atom<Date>(new Date())

export const createPreviewUrlsAtom = atom<string[]>([])
