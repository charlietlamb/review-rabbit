import { atom } from 'jotai'
import { LanguageWithFlag } from '@/types/language'
import { uploadsAtom } from '../upload/uploadsAtom'

export const dubLanguagesAtom = atom<LanguageWithFlag[]>([])
export const dubMediaAtom = atom<Media[]>([])
export const dubSelectedMediaAtom = atom<Media[]>([])

export const dubAvailableMediaAtom = atom<Media[]>((get) => {
  const uploads = get(uploadsAtom)
  const media = get(dubMediaAtom)

  return uploads.filter((upload) => !media?.some((m) => m.id === upload.id))
})
