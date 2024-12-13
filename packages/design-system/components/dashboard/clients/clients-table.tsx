'use client'

import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from '@remio/design-system/components/roadmap-ui/table'
import type { ColumnDef } from '@tanstack/react-table'
import { cn } from '@remio/design-system/lib/utils'
import { format } from 'date-fns'
import {
  clientsAtoms,
  clientsSearchAtom,
} from '@remio/design-system/atoms/dashboard/clients/clients-atoms'
import { Client } from '@remio/database/schema/clients'
import ClientsNewDialog from './clients-new-dialog'
import { useInfiniteQueryWithAtom } from '@remio/design-system/hooks/use-infinite-query-with-atom'
import { fetchClients } from '@remio/design-system/actions/clients/fetch-clients'
import InfiniteScroll from '@remio/design-system/components/misc/infinite-scroll'
import { Users } from 'lucide-react'
import ClientsTableDropdown from './clients-table-dropdown'
import { Button } from '@remio/design-system/components/ui/button'
import { useAtom } from 'jotai'
import { useDebounce } from '@remio/design-system/hooks/use-debounce'
import Spinner from '@remio/design-system/components/misc/spinner'
import ClientAvatar from './client-avatar'

export default function ClientsTable() {
  const {
    items: clients,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQueryWithAtom({
    queryKey: 'clients',
    fetchFn: fetchClients,
    atom: clientsAtoms,
    searchAtom: clientsSearchAtom,
    filterFn: (client, search) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      (client.email?.toLowerCase().includes(search.toLowerCase()) ?? false),
  })

  if (isLoading && !clients.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'details',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ClientAvatar client={row.original} />
          <div className="flex flex-col"></div>
          <div>
            <span className="font-medium font-heading">
              {row.original.name}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span>{row.original.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'phoneNumber',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => (
        <p className="text-muted-foreground">{row.original.phoneNumber}</p>
      ),
    },
    {
      accessorKey: 'date-created',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Date Created" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>{format(row.original.createdAt, 'dd/MM/yyyy')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'edit',
      header: () => null,
      cell: ({ row }) => <ClientsTableDropdown client={row.original} />,
    },
  ]

  return (
    <>
      {clients.length > 0 ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <TableProvider
            columns={columns}
            data={clients}
            className="border overflow-y-auto"
          >
            <TableHeader>
              {({ headerGroup }) => (
                <TableHeaderGroup
                  key={headerGroup.id}
                  headerGroup={headerGroup}
                >
                  {({ header }) => (
                    <TableHead
                      key={header.id}
                      header={header}
                      className={cn(
                        header.column.id === 'disconnectButton' &&
                          'justify-end flex items-center'
                      )}
                    />
                  )}
                </TableHeaderGroup>
              )}
            </TableHeader>
            <TableBody>
              {({ row }) => (
                <TableRow key={row.id} row={row}>
                  {({ cell }) => (
                    <TableCell
                      key={cell.id}
                      cell={cell}
                      className={cn(
                        cell.column.id === 'disconnectButton' &&
                          'justify-end flex items-center'
                      )}
                    />
                  )}
                </TableRow>
              )}
            </TableBody>
          </TableProvider>
        </InfiniteScroll>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 flex-grow h-full">
          <Users />
          <p className="font-heading">
            We couldn't find any connected clients...
          </p>
          <ClientsNewDialog>
            <Button variant="shine">Add New Client</Button>
          </ClientsNewDialog>
        </div>
      )}
    </>
  )
}
