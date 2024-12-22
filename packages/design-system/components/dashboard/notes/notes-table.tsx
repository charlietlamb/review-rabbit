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
import { NoteWithMediation } from '@remio/database'
import { useRouter } from 'next/navigation'
import MediationAvatar from '../mediation/mediation-avatar'
import { getNotes } from '@remio/design-system/actions/notes/get-notes'
import { PAGE_SIZE } from '@remio/design-system/lib/constants'
import NoteTableDropdown from './note-table-dropdown'
import NoteEditDialog from './note-edit-dialog'
import {
  notesAtoms,
  notesSearchAtom,
} from '@remio/design-system/atoms/dashboard/notes/notes-atoms'

export default function NotesTable({ mediationId }: { mediationId?: string }) {
  const router = useRouter()
  const {
    items: invoices,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQueryWithAtom({
    queryKey: ['notes', mediationId ?? ''],
    fetchFn: (page) => getNotes(PAGE_SIZE * page, PAGE_SIZE, mediationId),
    atom: notesAtoms,
    searchAtom: notesSearchAtom,
    filterFn: (note, search) =>
      note.title.toLowerCase().includes(search.toLowerCase()),
  })

  const columns: ColumnDef<NoteWithMediation>[] = [
    {
      accessorKey: 'details',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-2">
            <MediationAvatar mediation={row.original.mediation} />
            <div className="flex flex-col">
              <span className="font-medium font-heading">
                {row.original.title}
              </span>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <div className="text-sm text-muted-foreground truncate">
                  {row.original.mediation.data
                    .map((d) => d.client.name)
                    .join(', ')}
                </div>
              </div>
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
      cell: ({ row }) => <NoteTableDropdown note={row.original} />,
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
                        `/dashboard/note/${(row.original as NoteWithMediation).id}`
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
          <p className="font-heading">We couldn't find any notes...</p>
          <NoteEditDialog redirect>
            <Button variant="shine">Add New Note</Button>
          </NoteEditDialog>
        </div>
      )}
    </>
  )
}
