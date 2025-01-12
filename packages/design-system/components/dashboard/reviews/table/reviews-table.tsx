'use client'

import {
  reviewsAtom,
  reviewsSearchAtom,
  reviewsSelectedAtoms,
} from '@rabbit/design-system/atoms/reviews/review-atoms'
import { QUERY_KEYS } from '@rabbit/design-system/data/query-keys'
import { useInfiniteQueryWithAtom } from '@rabbit/design-system/hooks/use-infinite-query-with-atom'
import Spinner from '@rabbit/design-system/components/misc/spinner'
import { Review } from '@rabbit/google/types'
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
import { useAtom } from 'jotai'
import { getTableCheckboxColumn } from '@rabbit/design-system/components/dashboard/table/table-checkbox'
import { getGoogleReviews } from '@rabbit/design-system/actions/google/get-google-reviews'
import { Account } from '@rabbit/database'

export default function ReviewsTable({ account }: { account: Account }) {
  const {
    items: reviews,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQueryWithAtom({
    queryKey: QUERY_KEYS.REVIEWS,
    fetchFn: (page) => getGoogleReviews(page + 1),
    atom: reviewsAtom,
    searchAtom: reviewsSearchAtom,
    filterFn: (review, search) =>
      review.name.toLowerCase().includes(search.toLowerCase()),
  })

  const router = useRouter()
  const [selectedReviews, setSelectedReviews] = useAtom(reviewsSelectedAtoms)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  const columns: ColumnDef<Review>[] = [
    getTableCheckboxColumn<Review>(
      reviews,
      reviewsSelectedAtoms,
      setSelectedReviews
    ),
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div>
            <span>{row.original.name}</span>
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
                router.push(`/dashboard/review/${row.original.id}`)
              }
            >
              <ExternalLink className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Review</TooltipContent>
        </Tooltip>
      ),
    },
  ]

  return (
    <>
      {reviews.length > 0 ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <TableProvider
            columns={columns}
            data={reviews}
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
          <p className="font-heading">We couldn't find any reviews... </p>
          <p className="text-muted-foreground text-sm">
            Make sure your account is connected to your Google Business Profile.
          </p>
        </div>
      )}
    </>
  )
}
