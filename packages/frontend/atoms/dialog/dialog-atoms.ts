import { EDIT_ACCOUNT_DIALOG_KEY } from '@/constants/dialog/dialog-keys'
import { atom } from 'jotai'

export const dialogOpenAtom = atom(false)
export const dialogKeyAtom = atom<DialogType | null>(null)

export type DialogType = typeof EDIT_ACCOUNT_DIALOG_KEY
