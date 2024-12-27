'use client'

import {
  RadioGroup,
  RadioGroupItem,
} from '@burse/design-system/components/ui/radio-group'
import { cn } from '@burse/design-system/lib/utils'
import RequiredLabel from '@burse/design-system/components/misc/required-label'
import { useAtom } from 'jotai'
import {
  CustomTheme as CustomThemeType,
  customThemeAtom,
  customThemeOptions,
} from '@burse/design-system/atoms/dashboard/theme/custom-theme-atom'

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
