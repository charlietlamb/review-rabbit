import { ClientWithReviewMatches } from '@rabbit/database'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@rabbit/design-system/lib/utils'
import { Button } from '@rabbit/design-system/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@rabbit/design-system/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rabbit/design-system/components/ui/popover'
import ClientAvatar from 'components/dashboard/clients/avatar/client-avatar'
import { useState } from 'react'
import { useAtom } from 'jotai'
import {
  clientsSelectAtom,
  clientsSelectSearchAtom,
} from '@rabbit/design-system/atoms/dashboard/clients/client-select-atoms'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { fetchClients } from '@rabbit/design-system/actions/clients/fetch-clients'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { useFormContext } from '@rabbit/design-system/components/form/form-context'
import RequiredLabel from '@rabbit/design-system/components/misc/required-label'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'

export default function ClientSelect({
  selectedClient,
  setSelectedClient,
  required = true,
  className,
}: {
  selectedClient: ClientWithReviewMatches | null
  setSelectedClient: (client: ClientWithReviewMatches | null) => void
  required?: boolean
  className?: string
}) {
  const { attemptSubmitted } = useFormContext()
  const { items: clients, isLoading } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.CLIENT_SELECT,
    fetchFn: fetchClients,
    atom: clientsSelectAtom,
    searchAtom: clientsSelectSearchAtom,
    filterFn: (client, search) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      (client.email?.toLowerCase().includes(search.toLowerCase()) ?? false),
  })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useAtom(clientsSelectSearchAtom)

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <RequiredLabel
        required={required}
        htmlFor="client-select"
        className="font-heading text-base font-semibold text-foreground"
      >
        Client
      </RequiredLabel>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between bg-background hover:bg-background h-auto px-2',
              attemptSubmitted &&
                !selectedClient &&
                'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            )}
          >
            {selectedClient ? (
              <span className="flex items-center gap-2">
                <ClientAvatar client={selectedClient} />
                <span className="flex flex-col items-start gap-0.5">
                  <span className="block font-medium">
                    {selectedClient.name}
                  </span>
                  {selectedClient.email && (
                    <span className="block text-xs text-muted-foreground">
                      {selectedClient.email}
                    </span>
                  )}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Select a client...</span>
            )}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search clients..."
              value={search}
              onValueChange={(value) => setSearch(value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setOpen(false)
                }
                e.stopPropagation()
              }}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? (
                  <div className="flex py-4 items-center justify-center h-full">
                    <Spinner />
                  </div>
                ) : (
                  'No clients found.'
                )}
              </CommandEmpty>
              <CommandGroup>
                {clients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.id}
                    onSelect={() => {
                      setSelectedClient(client)
                      setOpen(false)
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="cursor-pointer hover:bg-border transition-colors duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <ClientAvatar client={client} />
                      <span className="flex flex-col items-start gap-0.5">
                        <span className="block font-medium">{client.name}</span>
                        {client.email && (
                          <span className="block text-xs text-muted-foreground">
                            {client.email}
                          </span>
                        )}
                      </span>
                    </span>
                    {selectedClient?.id === client.id && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {attemptSubmitted && !selectedClient && (
        <p className="text-sm text-destructive">You must select a client</p>
      )}
    </div>
  )
}
