import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rabbit/design-system/components/ui/select'
import ClientMultiAvatar from '@rabbit/design-system/components/dashboard/clients/avatar/client-multi-avatar'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { fetchClients } from '@rabbit/design-system/actions/clients/fetch-clients'
import { clientsAtoms } from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'
import { clientsSearchAtom } from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'
import InfiniteScroll from '@rabbit/design-system/components/misc/infinite-scroll'
import ClientAvatar from 'components/dashboard/clients/avatar/client-avatar'
import { Client } from '@rabbit/database/schema/app/clients'
import { cn } from '@rabbit/design-system/lib/utils'
import { QUERY_KEYS } from 'data/query-keys'

export default function ClientSelectSlick({
  value,
  setValue,
  className,
}: {
  value: Client | undefined
  setValue: (value: Client | undefined) => void
  className?: string
}) {
  const {
    items: clients,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.CLIENTS,
    fetchFn: fetchClients,
    atom: clientsAtoms,
    searchAtom: clientsSearchAtom,
    filterFn: (client, search) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      (client.email?.toLowerCase().includes(search.toLowerCase()) ?? false),
  })

  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === 'all') {
      setValue(undefined)
    } else {
      const selectedClient = clients.find((c) => c.id === selectedValue)
      setValue(selectedClient)
    }
  }

  return (
    <Select value={value?.id ?? 'all'} onValueChange={handleValueChange}>
      <SelectTrigger
        id="select-38"
        className={cn(
          'ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0',
          className
        )}
      >
        <SelectValue>
          {value ? (
            <div className="flex items-center gap-2">
              <ClientAvatar
                size="xs"
                client={value}
                className="size-5 rounded"
              />
              <span className="truncate">{value.name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ClientMultiAvatar clients={clients} />
              <span className="truncate">All clients</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
        <SelectGroup>
          <SelectItem value="all">
            <ClientMultiAvatar clients={clients} />
            <span className="truncate">All clients</span>
          </SelectItem>
          <InfiniteScroll
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {clients.map((client) => (
              <SelectItem value={client.id} key={client.id}>
                <ClientAvatar
                  size="xs"
                  client={client}
                  className="size-5 rounded"
                />
                <span className="truncate">{client.name}</span>
              </SelectItem>
            ))}
          </InfiniteScroll>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
