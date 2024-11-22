import { atom } from 'jotai'
import {
  Language,
  LanguageWithFlag,
  languagesMap,
} from '@dubble/design-system/data/language'
import { uploadsAtom } from '../upload/uploadsAtom'
import { Option } from '@dubble/design-system/components/misc/multi-select'

export const dubLanguagesOptionsAtom = atom<Option[]>([])
export const dubLanguagesAtom = atom<LanguageWithFlag[]>((get) => {
  const options = get(dubLanguagesOptionsAtom)
  return options
    .map((option) => languagesMap.get(option.value as Language)!)
    .filter(Boolean)
})

export const dubMediaAtom = atom<Media[]>([])
export const dubSelectedMediaAtom = atom<Media[]>([])

export const dubMediaDurationAtom = atom<number>((get) => {
  const media = get(dubMediaAtom)
  return media.reduce((acc, curr) => acc + curr.duration, 0)
})

export const dubTokensAtom = atom<number>((get) => {
  const media = get(dubMediaAtom)
  const languages = get(dubLanguagesAtom)
  return (
    media.reduce((acc, curr) => {
      return acc + Math.ceil(curr.duration / 60)
    }, 0) * languages.length
  )
})

export const dubAvailableMediaAtom = atom<Media[]>((get) => {
  const uploads = get(uploadsAtom)
  const media = get(dubMediaAtom)

  return uploads.filter((upload) => !media?.some((m) => m.id === upload.id))
})
