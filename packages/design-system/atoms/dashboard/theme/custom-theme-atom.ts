import { atomWithLocalStorage } from '@burse/design-system/atoms/utility/atom-with-local-storage'

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
  'blue'
)
