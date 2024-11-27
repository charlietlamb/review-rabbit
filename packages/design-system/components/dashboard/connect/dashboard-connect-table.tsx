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
} from '@dubble/design-system/components/roadmap-ui/table'
import type { ColumnDef } from '@tanstack/react-table'
import { providerData } from '../../../lib/providers'
import { cn } from '@dubble/design-system/lib/utils'

export const DashboardConnectTable = () => {
  const columns: ColumnDef<(typeof providerData)[number]>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className={row.original.classNameInner}>
              {row.original.icon}
            </span>
            <div
              className={cn(
                'absolute right-0 bottom-0 h-2 w-2 rounded-full ring-2 ring-background',
                row.original.className
              )}
            />
          </div>
          <div>
            <span className="font-medium">{row.original.name}</span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span>{row.original.company}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'connected',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Connected" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span>{false ? 'Disconnect?' : row.original.button}</span>
        </div>
      ),
    },
  ]

  return (
    <TableProvider columns={columns} data={providerData}>
      <TableHeader>
        {({ headerGroup }) => (
          <TableHeaderGroup key={headerGroup.id} headerGroup={headerGroup}>
            {({ header }) => <TableHead key={header.id} header={header} />}
          </TableHeaderGroup>
        )}
      </TableHeader>
      <TableBody>
        {({ row }) => (
          <TableRow key={row.id} row={row}>
            {({ cell }) => <TableCell key={cell.id} cell={cell} />}
          </TableRow>
        )}
      </TableBody>
    </TableProvider>
  )
}
