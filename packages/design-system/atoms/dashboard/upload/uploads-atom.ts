import { atom } from 'jotai'
import { Media } from '@remio/database/schema/media'

export const uploadPagesAtom = atom<Media[][]>([])
export const uploadsSortAtom = atom<
  'name' | 'newest' | 'oldest' | 'smallest' | 'largest' | 'type'
>('newest')
export const uploadsLayoutAtom = atom<'grid' | 'list'>('grid')
export const uploadsSearchAtom = atom<string>('')

export const uploadsLastUpdatedAtom = atom<Date | null>(null)

export const uploadsAtom = atom((get) => {
  const pages = get(uploadPagesAtom)
  const sort = get(uploadsSortAtom)
  const search = get(uploadsSearchAtom)

  let uploads = pages.flat()

  if (search) {
    uploads = uploads.filter((media) =>
      media.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  uploads.sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'smallest':
        return a.size - b.size
      case 'largest':
        return b.size - a.size
      case 'type':
        return a.extension.localeCompare(b.extension)
      default:
        return 0
    }
  })

  return uploads
})
