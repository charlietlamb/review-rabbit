import { atom } from 'jotai'
import { Review } from '@rabbit/google/types'

export const reviewsAtom = atom<Review[]>([])
export const reviewsSelectedAtoms = atom<Review[]>([])
export const reviewsSearchAtom = atom<string>('')
