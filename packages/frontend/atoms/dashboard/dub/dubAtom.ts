import { atom } from 'jotai'
import { LanguageWithFlag } from '@/types/language'
import { uploadPagesAtom, uploadsAtom } from '../upload/uploadsAtom'

export const dubLanguageAtom = atom<LanguageWithFlag | null>(null)
export const dubMediaAtom = atom<Media[] | null>(null)
export const dubSelectedMediaAtom = atom<Media[]>([])

export const dubAvailableMediaAtom = atom<Media[]>((get) => {
  const uploads = get(uploadsAtom)
  const media = get(dubMediaAtom)

  return uploads.filter((upload) => !media?.some((m) => m.id === upload.id))
})
