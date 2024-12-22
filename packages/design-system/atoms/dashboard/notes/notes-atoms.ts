import { atom } from 'jotai'
import { NoteWithMediation } from '@remio/database'

export const noteContentAtom = atom('')

export const notesSearchAtom = atom<string>('')
export const notesAtoms = atom<NoteWithMediation[]>([])
