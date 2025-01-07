'use client'

import { workflowsSearchAtom } from '@rabbit/design-system/atoms/dashboard/workflows/workflows-atoms'
import { workflowsAtoms } from '@rabbit/design-system/atoms/dashboard/workflows/workflows-atoms'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import { getWorkflows } from '@rabbit/design-system/actions/workflows/get-workflows'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { WorkflowWithItems } from '@rabbit/database/types/workflow-types'
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
      workflow.title.toLowerCase().includes(search.toLowerCase()),
  })
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  const columns: ColumnDef<WorkflowWithItems>[] = [
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
                router.push(`/dashboard/workflow/${row.original.id}`)
              }
            >
              <ExternalLink className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Workflow</TooltipContent>
        </Tooltip>
      ),
    },
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
                <TableRow key={row.id} row={row} className="w-full">
                  {({ cell }) => (
                    <TableCell
                      key={cell.id}
                      cell={cell}
                      className={cn(
                        cell.column.id === 'edit'
                          ? 'justify-end flex items-center w-full'
                          : 'w-full'
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
