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
import BusinessFormDialog from './business-form-dialog'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import InfiniteScroll from '@rabbit/design-system/components/misc/infinite-scroll'
import { Users } from 'lucide-react'
import { Button } from '@rabbit/design-system/components/ui/button'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { businessSearchAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'
import { businessesAtom } from '@rabbit/design-system/atoms/dashboard/business/business-atoms'
import { BusinessWithLocations } from '@rabbit/database/types/business-location-types'
import BusinessTableDropdown from './business-table-dropdown'
import BusinessAvatar from './business-avatar'
import { getBusinesses } from '@rabbit/design-system/actions/business/get-businesses'

export default function BusinessTable() {
  const {
    items: businesses,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.BUSINESS,
    fetchFn: getBusinesses,
    atom: businessesAtom,
    searchAtom: businessSearchAtom,
    filterFn: (business, search) =>
      business.name.toLowerCase().includes(search.toLowerCase()) ||
      (business.email?.toLowerCase().includes(search.toLowerCase()) ?? false),
  })
  const router = useRouter()

  if (isLoading && !businesses.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  const columns: ColumnDef<BusinessWithLocations>[] = [
    {
      accessorKey: 'details',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <BusinessAvatar business={row.original} />
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
      cell: ({ row }) => <BusinessTableDropdown business={row.original} />,
    },
  ]

  return (
    <>
      {businesses.length > 0 ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <TableProvider
            columns={columns}
            data={businesses}
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
                      `/dashboard/business/${(row.original as BusinessWithLocations).id}`
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
          <p className="font-heading">We couldn't find any businesses...</p>
          <BusinessFormDialog>
            <Button variant="shine">Add New Business</Button>
          </BusinessFormDialog>
        </div>
      )}
    </>
  )
}
