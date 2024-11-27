import { atom } from 'jotai'
import { ProviderData, providerData } from '@dubble/design-system/lib/providers'

export const providersAtom = atom<ProviderData[]>((get) => {
  const sort = get(providersSortAtom)
  const search = get(providersSearchAtom)
  const filtered = providerData.filter((platform) =>
    platform.name.toLowerCase().includes(search.toLowerCase())
  )
  filtered.sort((a, b) => {
    if (sort === 'name-ascending') {
      return a.name.localeCompare(b.name)
    }
    return b.name.localeCompare(a.name)
  })
  return filtered
})
export const providersSortAtom = atom<'name-ascending' | 'name-descending'>(
  'name-ascending'
)
export const providersLayoutAtom = atom<'grid' | 'list'>('grid')
export const providersSearchAtom = atom<string>('')
