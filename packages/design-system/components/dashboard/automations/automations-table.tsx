'use client'

import { automationsSearchAtom } from '@rabbit/design-system/atoms/dashboard/automations/automation-atoms'
import { automationsAtom } from '@rabbit/design-system/atoms/dashboard/automations/automation-atoms'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { AutomationWithItems } from '@rabbit/database/types/automation-types'
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
import InfiniteScroll from '@rabbit/design-system/components/misc/infinite-scroll'
import { cn } from '@rabbit/design-system/lib/utils'
import { WorkflowIcon, ExternalLink } from 'lucide-react'
import { Button } from '@rabbit/design-system/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@rabbit/design-system/components/ui/tooltip'
import { getAutomations } from '@rabbit/design-system/actions/automations/get-automations'
import { Badge } from '@rabbit/design-system/components/ui/badge'
import AutomationFormDialog from './automation-form-dialog'

export default function AutomationsTable() {
  const {
    items: automations,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.AUTOMATIONS,
    fetchFn: (page, search) => getAutomations(page, search || ''),
    atom: automationsAtom,
    searchAtom: automationsSearchAtom,
    filterFn: (automation, search) =>
      automation.title.toLowerCase().includes(search.toLowerCase()),
  })
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  const columns: ColumnDef<AutomationWithItems>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div>
            <span>{row.original.title}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.items.some(
          (item) => item.status === 'failed'
        )
          ? 'Failed'
          : row.original.items.some((item) => item.status === 'pending')
            ? 'Pending'
            : 'Success'
        return (
          <Badge
            variant={status.toLowerCase() as 'success' | 'pending' | 'failed'}
          >
            <span className="font-medium font-heading">{status}</span>
          </Badge>
        )
      },
    },
    {
      accessorKey: 'clicks',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Clicks" />
      ),
      cell: ({ row }) => (
        <span>{row.original.items.filter((item) => item.clicked).length}</span>
      ),
    },
    {
      accessorKey: 'click-percentage',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Click %" />
      ),
      cell: ({ row }) => (
        <span>
          {Math.round(
            (row.original.items.filter((item) => item.clicked).length /
              (row.original.items.length ? row.original.items.length : 1)) *
              100
          )}
          %
        </span>
      ),
    },
    {
      accessorKey: 'initially-run',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Initially Run" />
      ),
      cell: ({ row }) => (
        <span>
          {new Date(row.original.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      accessorKey: 'last-run',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Last Run" />
      ),
      cell: ({ row }) => (
        <span>
          {row.original.items.length > 0
            ? new Date(
                row.original.items[row.original.items.length - 1].createdAt
              ).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'edit',
      header: () => null,
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto size-8 p-2"
              size="icon"
              onClick={() =>
                router.push(`/dashboard/automation/${row.original.id}`)
              }
            >
              <ExternalLink className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Automation</TooltipContent>
        </Tooltip>
      ),
    },
  ]

  return (
    <>
      {automations.length > 0 ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <TableProvider
            columns={columns}
            data={automations}
            className="overflow-y-auto"
          >
            <TableHeader>
              {({ headerGroup }) => (
                <TableHeaderGroup
                  key={headerGroup.id}
                  headerGroup={headerGroup}
                >
                  {({ header }) => (
                    <TableHead key={header.id} header={header} />
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
                        cell.column.id === 'edit' && 'justify-end flex'
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
          <WorkflowIcon className="w-10 h-10 text-muted-foreground" />
          <p className="font-heading">We couldn't find any automations...</p>
          <AutomationFormDialog>
            <Button variant="shine">Add New Automation</Button>
          </AutomationFormDialog>
        </div>
      )}
    </>
  )
}
