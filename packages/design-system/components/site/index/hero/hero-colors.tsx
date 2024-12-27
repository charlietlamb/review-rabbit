'use client'

import {
  customThemeAtom,
  customThemeOptions,
  CustomTheme as CustomThemeType,
} from '@burse/design-system/atoms/dashboard/theme/custom-theme-atom'
import { useSetAtom } from 'jotai'
import {
  RadioGroup,
  RadioGroupItem,
} from '@burse/design-system/components/ui/radio-group'
import { cn } from '@burse/design-system/lib/utils'

export function HeroColors() {
  const setTheme = useSetAtom(customThemeAtom)

  return (
    <RadioGroup className="flex gap-4 py-2 opacity-10">
      {customThemeOptions.map((color) => (
        <span className={color} key={color}>
          <RadioGroupItem
            value={color}
            className={cn(
              'size-8 shadow-none transition-all duration-200 bg-primary rounded-none'
            )}
            onMouseEnter={() => setTheme(color as CustomThemeType)}
            indicatorClassName="hidden"
          />
        </span>
      ))}
    </RadioGroup>
  )
}
