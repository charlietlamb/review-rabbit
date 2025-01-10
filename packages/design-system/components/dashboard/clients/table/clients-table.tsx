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
} from '@rabbit/design-system/components/roadmap-ui/table'
import type { ColumnDef } from '@tanstack/react-table'
import { cn } from '@rabbit/design-system/lib/utils'
import { format } from 'date-fns'
import {
  clientsAtoms,
  clientsSearchAtom,
} from '@rabbit/design-system/atoms/dashboard/clients/clients-atoms'
import { Client } from '@rabbit/database/schema/app/clients'
import ClientsNewDialog from '../dialog/clients-new-dialog'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { fetchClients } from '@rabbit/design-system/actions/clients/fetch-clients'
import InfiniteScroll from '@rabbit/design-system/components/misc/infinite-scroll'
import { Users } from 'lucide-react'
import ClientsTableDropdown from './clients-table-dropdown'
import { Button } from '@rabbit/design-system/components/ui/button'
import ClientAvatar from '../avatar/client-avatar'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import TableLoading from '@rabbit/design-system/components/dashboard/table/table-loading'

export default function ClientsTable() {
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
  const router = useRouter()

  if (isLoading && !clients.length) {
    return <TableLoading />
  }

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'details',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ClientAvatar className="text-foreground" client={row.original} />
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
        <p className="text-muted-foreground">{row.original.phone}</p>
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
            className="overflow-y-auto"
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
                <TableRow
                  key={row.id}
                  row={row}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(
                      `/dashboard/client/${(row.original as Client).id}`
                    )
                  }}
                >
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
          <p className="font-heading">We couldn't find any clients...</p>
          <ClientsNewDialog>
            <Button variant="shine">Add New Client</Button>
          </ClientsNewDialog>
        </div>
      )}
    </>
  )
}
