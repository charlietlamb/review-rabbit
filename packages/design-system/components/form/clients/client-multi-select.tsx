import { CheckIcon, ChevronDown, X } from 'lucide-react'
import { cn } from '@rabbit/design-system/lib/utils'
import { Button } from '@rabbit/design-system/components/ui/button'
import { Badge } from '@rabbit/design-system/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rabbit/design-system/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@rabbit/design-system/components/ui/command'
import {
  clientsSelectOptionsAtom,
  clientsSelectSearchAtom,
  selectedClientsAtom,
} from '@rabbit/design-system/atoms/dashboard/client/client-multi-select-atoms'
import { useAtom } from 'jotai'
import { fetchClients } from '@rabbit/design-system/actions/clients/fetch-clients'
import { ClientWithData } from '@rabbit/database/schema/app/clients'
import ClientAvatar from '@rabbit/design-system/components/dashboard/clients/avatar/client-avatar'
import { useState } from 'react'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { useFormContext } from '../form-context'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'

export default function ClientMultiSelect({
  className,
}: {
  className?: string
}) {
  const [search, setSearch] = useAtom(clientsSelectSearchAtom)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [selectedClients, setSelectedClients] = useAtom(selectedClientsAtom)
  const { attemptSubmitted } = useFormContext()

  const { items: options, isFetching } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.CLIENT_MULTI_SELECT,
    fetchFn: fetchClients,
    atom: clientsSelectOptionsAtom,
    searchAtom: clientsSelectSearchAtom,
    filterFn: (client, search) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      (client.email?.toLowerCase().includes(search.toLowerCase()) ?? false),
  })

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsPopoverOpen(true)
    } else if (event.key === 'Backspace' && !event.currentTarget.value) {
      const newSelectedValues = [...selectedClients]
      newSelectedValues.pop()
      setSelectedClients(newSelectedValues)
    }
  }

  const toggleOption = (option: ClientWithData) => {
    const newSelectedValues = selectedClients.some(
      (client) => client.id === option.id
    )
      ? selectedClients.filter((value) => value.id !== option.id)
      : [...selectedClients, option]
    setSelectedClients(newSelectedValues)
  }

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleTogglePopover}
          className={cn(
            'flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto',
            className
          )}
        >
          {selectedClients.length > 0 ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-wrap items-center gap-2 p-2">
                {selectedClients.map((client) => (
                  <Badge
                    key={client.id}
                    className={cn(
                      'group flex items-center gap-2 px-2 py-1.5 rounded-md',
                      'bg-background/50 hover:bg-background/80',
                      'border border-border/50 hover:border-border/80',
                      'text-foreground hover:text-foreground',
                      'transition-all duration-200 ease-in-out',
                      'backdrop-blur-sm'
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <ClientAvatar client={client} size="xs" />
                    <span className="text-sm font-medium">{client.name}</span>
                    <X
                      className={cn(
                        'w-3.5 h-3.5 cursor-pointer',
                        'text-muted-foreground/50 hover:text-red-500',
                        'transition-colors duration-200'
                      )}
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleOption(client)
                      }}
                    />
                  </Badge>
                ))}
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
      {attemptSubmitted && !selectedClients.length && (
        <div className="text-red-500 text-sm">
          Please select at least one client
        </div>
      )}
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
          {isFetching ? (
            <div className="flex items-center justify-center p-4">
              <Spinner />
            </div>
          ) : (
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
                      <ClientAvatar
                        client={option}
                        className="mr-2"
                        size="sm"
                      />
                      <span>{option.name}</span>
                      <div
                        className={cn(
                          'ml-4 flex h-4 w-4 items-center justify-center',
                          isSelected
                            ? 'text-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className="size-4" />
                      </div>
                      <span className="hidden">{option.id}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
