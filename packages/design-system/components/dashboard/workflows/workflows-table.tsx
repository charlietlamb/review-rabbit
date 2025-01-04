'use client'

import { workflowsSearchAtom } from '@rabbit/design-system/atoms/dashboard/workflows/workflows-atoms'
import { workflowsAtoms } from '@rabbit/design-system/atoms/dashboard/workflows/workflows-atoms'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { getWorkflows } from '@rabbit/design-system/actions/workflows/get-workflows'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { WorkflowWithItems } from '@rabbit/database/schema/app/workflows'
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
import { WorkflowIcon } from 'lucide-react'
import { Button } from '@rabbit/design-system/components/ui/button'

export default function WorkflowsTable() {
  const {
    items: workflows,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.WORKFLOWS,
    fetchFn: (page, search) => getWorkflows(page, search || ''),
    atom: workflowsAtoms,
    searchAtom: workflowsSearchAtom,
    filterFn: (workflow, search) =>
      workflow.name.toLowerCase().includes(search.toLowerCase()),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  const columns: ColumnDef<WorkflowWithItems>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div>
            <span className="font-medium font-heading">
              {row.original.name}
            </span>
          </div>
        </div>
      ),
    },
    // {
    //   accessorKey: 'edit',
    //   header: () => null,
    //   cell: ({ row }) => <ClientsTableDropdown client={row.original} />,
    // },
  ]

  return (
    <>
      {workflows.length > 0 ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <TableProvider
            columns={columns}
            data={workflows}
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
                <TableRow key={row.id} row={row} className="cursor-pointer">
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
          <WorkflowIcon className="w-10 h-10 text-muted-foreground" />
          <p className="font-heading">We couldn't find any workflows...</p>
          <Button variant="shine">Add New Workflow</Button>
        </div>
      )}
    </>
  )
}
