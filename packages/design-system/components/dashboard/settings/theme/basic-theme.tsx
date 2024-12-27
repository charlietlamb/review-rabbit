'use client'

import {
  RadioGroup,
  RadioGroupItem,
} from '@burse/design-system/components/ui/radio-group'
import { env } from '@burse/env'
import { Check, Minus } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
const items = [
  {
    id: 'radio-18-r1',
    value: 'light',
    label: 'Light',
    theme: 'light',
    url: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/UI Light.png`,
  },
  {
    id: 'radio-18-r2',
    value: 'dark',
    label: 'Dark',
    theme: 'dark',
    url: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/UI Dark Theme.png`,
  },
  {
    id: 'radio-18-r3',
    value: 'system',
    label: 'System',
    theme: 'system',
    url: `${env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/public/UI System.png`,
  },
]

export default function BasicTheme() {
  const { theme, setTheme } = useTheme()
  return (
    <fieldset className="flex flex-col gap-4">
      <RadioGroup
        className="flex gap-3"
        defaultValue={theme}
        onValueChange={(value) => setTheme(value)}
      >
        {items.map((item) => (
          <label key={item.id}>
            <RadioGroupItem
              id={item.id}
              value={item.value}
              className="peer sr-only after:absolute after:inset-0"
            />
            <Image
              src={item.url}
              alt={item.label}
              width={88}
              height={70}
              className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
            />
            <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
              <Check
                size={16}
                strokeWidth={2}
                className="peer-data-[state=unchecked]:group-[]:hidden"
                aria-hidden="true"
              />
              <Minus
                size={16}
                strokeWidth={2}
                className="peer-data-[state=checked]:group-[]:hidden"
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
