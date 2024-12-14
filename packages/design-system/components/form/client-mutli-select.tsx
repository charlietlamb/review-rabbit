// src/components/multi-select.tsx

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
} from 'lucide-react'

import { cn } from '@remio/design-system/lib/utils'
import { Separator } from '@remio/design-system/components/ui/separator'
import { Button } from '@remio/design-system/components/ui/button'
import { Badge } from '@remio/design-system/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@remio/design-system/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@remio/design-system/components/ui/command'
import {
  clientsSelectOptionsAtom,
  clientsSelectSearchAtom,
  selectedClientsAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediation-atoms'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { fetchClients } from '@remio/design-system/actions/clients/fetch-clients'
import { Client } from '@remio/database/schema/clients'
import ClientAvatar from '@remio/design-system/components/dashboard/clients/client-avatar'

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  'm-1 transition ease-in-out delay-150 hover:scale-105 duration-300',
  {
    variants: {
      variant: {
        default:
          'border-foreground/10 text-foreground bg-card hover:bg-card/80',
        secondary:
          'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        inverted: 'inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export default function ClientMultiSelect() {
  const [search, setSearch] = useAtom(clientsSelectSearchAtom)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [options, setOptions] = useAtom(clientsSelectOptionsAtom)
  const [selectedClients, setSelectedClients] = useAtom(selectedClientsAtom)

  useEffect(() => {
    async function fetchData() {
      const clients = await fetchClients(0, search)
      setOptions(clients)
    }
    fetchData()
  }, [search])

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsPopoverOpen(true)
    } else if (event.key === 'Backspace' && !event.currentTarget.value) {
      const newSelectedValues = [...selectedClients]
      newSelectedValues.pop()
      setSelectedClients(newSelectedValues)
    }
  }

  const toggleOption = (option: Client) => {
    const newSelectedValues = selectedClients.some(
      (client) => client.id === option.id
    )
      ? selectedClients.filter((value) => value.id !== option.id)
      : [...selectedClients, option]
    setSelectedClients(newSelectedValues)
  }

  const handleClear = () => {
    setSelectedClients([])
  }

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleTogglePopover}
          className="flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto"
        >
          {selectedClients.length > 0 ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-wrap items-center">
                {selectedClients.map((client) => {
                  return (
                    <Badge
                      key={client.id}
                      className={cn(
                        multiSelectVariants({ variant: 'default' }),
                        'flex items-center gap-2'
                      )}
                    >
                      <ClientAvatar client={client} size="xs" />
                      {client.name}
                      <XCircle
                        className="w-4 h-4 ml-2 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleOption(client)
                        }}
                      />
                    </Badge>
                  )
                })}
              </div>
              <div className="flex items-center justify-between">
                <XIcon
                  className="text-muted-foreground h-4 mx-2 cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation()
                    handleClear()
                  }}
                />
                <Separator
                  orientation="vertical"
                  className="min-h-6 flex h-full"
                />
                <ChevronDown className="text-muted-foreground h-4 mx-2 cursor-pointer" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full mx-auto">
              <span className="text-muted-foreground mx-3 text-sm">
                Select clients
              </span>
              <ChevronDown className="text-muted-foreground h-4 mx-2 cursor-pointer" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            onKeyDown={handleInputKeyDown}
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedClients.some(
                  (client) => client.id === option.id
                )
                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => toggleOption(option)}
                    className="flex items-center cursor-pointer"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center',
                        isSelected
                          ? 'text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <ClientAvatar client={option} className="mr-2" size="sm" />
                    <span>{option.name}</span>
                    <span className="hidden">{option.id}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>

            {selectedClients.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between">
                    <CommandItem
                      onSelect={handleClear}
                      className="justify-center flex-1 cursor-pointer"
                    >
                      Clear
                    </CommandItem>
                  </div>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
