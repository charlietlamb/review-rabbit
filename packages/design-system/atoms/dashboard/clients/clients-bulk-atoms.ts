import { atom } from 'jotai'

export const clientsBulkDataAtom = atom<string[][]>([])
export const clientsBulkHeadersAtom = atom<string[]>((get) => {
  const data = get(clientsBulkDataAtom)
  if (!data) return []
  return data[0]
})
