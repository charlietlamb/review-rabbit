'use client'

import {
  RadioGroup,
  RadioGroupItem,
} from '@rabbit/design-system/components/ui/radio-group'
import { cn } from '@rabbit/design-system/lib/utils'
import { useAtom } from 'jotai'
import {
  CustomTheme as CustomThemeType,
  customThemeAtom,
  customThemeOptions,
} from '@rabbit/design-system/atoms/dashboard/theme/custom-theme-atom'

export default function CustomTheme() {
  const [theme, setTheme] = useAtom(customThemeAtom)
  return (
    <RadioGroup
      className="flex gap-1.5"
      value={theme}
      onValueChange={(value) => setTheme(value as CustomThemeType)}
    >
      {customThemeOptions.map((color) => (
        <span className={color} key={color}>
          <RadioGroupItem
            value={color}
            className={cn(
              'size-6 shadow-none transition-all duration-200 bg-primary'
            )}
          />
        </span>
      ))}
    </RadioGroup>
  )
}
