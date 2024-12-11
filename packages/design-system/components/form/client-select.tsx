import { Client } from '@remio/database'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@remio/design-system/lib/utils'
import { Button } from '@remio/design-system/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@remio/design-system/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@remio/design-system/components/ui/popover'
import ClientAvatar from '../dashboard/clients/client-avatar'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { Label } from '@remio/design-system/components/ui/label'
import {
  clientsSelectAtom,
  clientsSelectSearchAtom,
} from '@remio/design-system/atoms/dashboard/clients/client-select-atoms'
import { useInfiniteQueryWithAtom } from '@remio/design-system/hooks/use-infinite-query-with-atom'
import { fetchClients } from '@remio/design-system/actions/clients/fetch-clients'
import Spinner from '@remio/design-system/components/misc/spinner'
import { TanstackForm } from '@remio/design-system/components/form/tanstack-form'
import { useFormContext } from '@remio/design-system/components/form/form-context'
import FieldInfo from '@remio/design-system/components/form/field-info'
import { z } from 'zod'
interface ClientSelectProps {
  form: TanstackForm<any>
  selectedClient: Client | null
  setSelectedClient: (client: Client | null) => void
  className?: string
}

export default function ClientSelect({
  form,
  selectedClient,
  setSelectedClient,
  className,
}: ClientSelectProps) {
  const { attemptSubmitted } = useFormContext()
  const { items: clients, isLoading } = useInfiniteQueryWithAtom({
    queryKey: 'clients-select',
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
    <form.Field
      name="clientId"
      validators={{
        onChange: z.string().min(1, 'Please select a client'),
      }}
    >
      {(field) => (
        <div className={cn('flex flex-col gap-1', className)}>
          <Label
            htmlFor="client-select"
            className="font-heading text-base font-semibold text-foreground"
          >
            Client <span className="text-destructive">*</span>
          </Label>
          <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  'w-full justify-between bg-background hover:bg-background h-auto px-2',
                  attemptSubmitted &&
                    field.state.meta.errors.some((error) => error) &&
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
                  <span className="text-muted-foreground">
                    Select a client...
                  </span>
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
                          field.handleChange(client.id)
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
                            <span className="block font-medium">
                              {client.name}
                            </span>
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
          {attemptSubmitted && <FieldInfo field={field} />}
        </div>
      )}
    </form.Field>
  )
}
