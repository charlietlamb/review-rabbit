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
import {
  invoicesAtoms,
  invoicesSearchAtom,
} from '@remio/design-system/atoms/dashboard/invoices/invoices-atoms'
import InvoiceCreateDialog from './invoice-edit-dialog'
import { InvoiceWithClient } from '@remio/database'
import InvoicesTableDropdown from './invoices-table-dropdown'
import ClientAvatar from '../clients/client-avatar'
import { Badge } from '@remio/design-system/components/ui/badge'
import { useRouter } from 'next/navigation'
import { fetchInvoices } from '@remio/design-system/actions/invoices/fetch-invoices'

export default function InvoicesTable({ clientId }: { clientId?: string }) {
  const router = useRouter()
  const {
    items: invoices,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQueryWithAtom({
    queryKey: ['invoices', clientId ?? ''],
    fetchFn: (page) => fetchInvoices(page, clientId),
    atom: invoicesAtoms,
    searchAtom: invoicesSearchAtom,
    filterFn: (invoice, search) =>
      invoice.client.name.toLowerCase().includes(search.toLowerCase()) ||
      ((invoice.client.email?.toLowerCase().includes(search.toLowerCase()) ??
        false) &&
        (clientId ? invoice.client.id === clientId : true)),
  })

  const columns: ColumnDef<InvoiceWithClient>[] = [
    {
      accessorKey: 'details',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-2">
            <ClientAvatar client={row.original.client} />
            <div className="flex flex-col">
              <span className="font-medium font-heading">
                {row.original.client.name}
              </span>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <span>{row.original.client.email}</span>
              </div>
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
        <p className="text-muted-foreground">
          {row.original.client.phoneNumber}
        </p>
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
      accessorKey: 'status',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="gap-1.5 text-muted-foreground font-medium"
        >
          <span
            className={cn(
              'size-1.5 rounded-full',
              row.original.paidAt && 'bg-emerald-500',
              !row.original.paidAt && 'bg-red-500'
            )}
            aria-hidden="true"
          ></span>
          {row.original.paidAt ? 'Paid' : 'Unpaid'}
        </Badge>
      ),
    },
    {
      accessorKey: 'edit',
      header: () => null,
      cell: ({ row }) => <InvoicesTableDropdown invoice={row.original} />,
    },
  ]

  return (
    <>
      {invoices.length > 0 ? (
        <>
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          >
            <TableProvider
              columns={columns}
              data={invoices}
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
                        `/dashboard/invoice/${
                          (row.original as InvoiceWithClient).id
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
        <div className="flex flex-col items-center justify-center gap-4 flex-grow h-full">
          <FileText />
          <p className="font-heading">We couldn't find any invoices...</p>
          <InvoiceCreateDialog>
            <Button variant="shine">Add New Invoice</Button>
          </InvoiceCreateDialog>
        </div>
      )}
    </>
  )
}
