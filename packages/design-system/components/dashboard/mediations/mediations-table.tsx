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
import InfiniteScroll from '@remio/design-system/components/misc/infinite-scroll'
import { FileText } from 'lucide-react'
import { Button } from '@remio/design-system/components/ui/button'
import { useInfiniteQueryWithAtom } from '@remio/design-system/hooks/use-infinite-query-with-atom'
import { MediationWithData } from '@remio/database'
import { useRouter } from 'next/navigation'
import { fetchMediationsByPage } from '@remio/design-system/actions/mediations/fetch-mediations-by-page'
import {
  mediationsAtoms,
  mediationsSearchAtom,
} from '@remio/design-system/atoms/dashboard/mediations/mediations-atoms'
import MediationAvatar from '../mediation/mediation-avatar'

export default function MediationsTable() {
  const router = useRouter()
  const {
    items: mediations,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQueryWithAtom({
    queryKey: ['mediations'],
    fetchFn: (page, search) => fetchMediationsByPage(page, search),
    atom: mediationsAtoms,
    searchAtom: mediationsSearchAtom,
  })

  const columns: ColumnDef<MediationWithData>[] = [
    {
      accessorKey: 'details',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-2">
            <MediationAvatar size="sm" mediation={row.original} />
            <div className="flex flex-col">
              <span className="font-medium font-heading">
                {row.original.title}
              </span>
              {row.original.data.some((data) => data.client.name) && (
                <span className="block text-xs text-muted-foreground truncate">
                  {row.original.data.map((data) => data.client.name).join(', ')}
                </span>
              )}
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
      accessorKey: 'date-due',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Scheduled" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>{format(row.original.date, 'dd/MM/yyyy HH:mm')}</span>
        </div>
      ),
    },
  ]

  return (
    <>
      {mediations.length > 0 ? (
        <>
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          >
            <TableProvider
              columns={columns}
              data={mediations}
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
                  <TableRow
                    key={row.id}
                    row={row}
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/dashboard/mediation/${
                          (row.original as MediationWithData).id
                        }`
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 flex-grow h-full py-20">
          <FileText />
          <p className="font-heading">We couldn't find any mediations...</p>
          <Button
            variant="shine"
            onClick={() => router.push('/dashboard/mediation/new')}
          >
            Add New Mediation
          </Button>
        </div>
      )}
    </>
  )
}
