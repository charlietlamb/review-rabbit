'use client'

import { Label } from '@/components/ui/label'
import { Check, ChevronDown } from 'lucide-react'
import { Fragment, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Language, languagesMap, languagesWithFlags } from '@/types/language'
import { useAtom } from 'jotai'
import { dubLanguageAtom } from '@/atoms/dashboard/dub/dubAtom'

export default function Select44() {
  const [open, setOpen] = useState<boolean>(false)
  const [language, setLanguage] = useAtom(dubLanguageAtom)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="select-44"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background px-3 font-normal hover:bg-background"
        >
          {language ? (
            <span className="flex min-w-0 items-center gap-2">
              <span className="text-lg leading-none">
                {
                  languagesWithFlags.find(
                    (languageWithFlag) =>
                      languageWithFlag.value === language.value
                  )?.flag
                }
              </span>
              <span className="truncate text-foreground">{language.label}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select language</span>
          )}
          <ChevronDown
            size={16}
            strokeWidth={2}
            className="shrink-0 text-muted-foreground/80"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            {languagesWithFlags.map((languageWithFlag) => (
              <CommandGroup key={languageWithFlag.value}>
                <CommandItem
                  key={languageWithFlag.value}
                  value={languageWithFlag.value}
                  onSelect={(currentValue) => {
                    setLanguage(languagesMap.get(currentValue as Language)!)
                    setOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg leading-none">
                    {languageWithFlag.flag}
                  </span>
                  {languageWithFlag.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      language?.value === languageWithFlag.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
