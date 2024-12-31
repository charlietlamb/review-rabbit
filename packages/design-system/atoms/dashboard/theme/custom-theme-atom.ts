import { atomWithLocalStorage } from '@rabbit/design-system/atoms/utility/atom-with-local-storage'

export const customThemeOptions = [
  'blue',
  'red',
  'orange',
  'green',
  'yellow',
  'violet',
]

export type CustomTheme = (typeof customThemeOptions)[number]

export const customThemeAtom = atomWithLocalStorage<CustomTheme>(
  'custom-theme',
  'green'
)
