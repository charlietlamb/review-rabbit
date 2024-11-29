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
import { cn } from '@dubble/design-system/lib/utils'
import { useDashboardConnectProviderContext } from './provider/dashboard-connect-provider-context'
import { Connect } from '@dubble/database/schema/connects'
import { format } from 'date-fns'
import { Button } from '@dubble/design-system/components/ui/button'
import { CloudAlert, Plus, X } from 'lucide-react'
import DisconnectDialog from './provider/disconnect-dialog'
import ConnectDialog from './provider/connect-dialog'
import { Separator } from '@dubble/design-system/components/ui/separator'
import { cloneElement } from 'react'

export const DashboardConnectTable = () => {
  const { provider, connects } = useDashboardConnectProviderContext()
  const largeIcon = cloneElement(provider.icon as React.ReactElement, {
    className: 'w-12 h-12 text-muted-foreground',
  })
  const columns: ColumnDef<Connect>[] = [
    {
      accessorKey: 'account',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="relative">
            {row.original.profileImageUrl && (
              <img
                src={row.original.profileImageUrl}
                alt={row.original.accountName}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div
              className={cn(
                'absolute right-0 bottom-0 h-2 w-2 rounded-full ring-2 ring-background bg-green-500'
              )}
            />
          </div>
          <div>
            <span className="font-medium font-heading">
              {row.original.username}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span>{row.original.accountName}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'connectedDate',
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Date Connected" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>{format(row.original.createdAt, 'dd/MM/yyyy')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'disconnectButton',
      header: () => (
        <ConnectDialog provider={provider}>
          <Plus />
        </ConnectDialog>
      ),
      cell: ({ row }) => (
        <DisconnectDialog className="px-7" connect={row.original} />
      ),
    },
  ]

  return (
    <>
      {connects.length > 0 ? (
        <>
          <TableProvider columns={columns} data={connects}>
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
                <TableRow key={row.id} row={row}>
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
          <Separator />
          <div className="flex p-2">
            <ConnectDialog className="w-full" provider={provider}>
              Connect another account
            </ConnectDialog>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 flex-grow font-heading">
          {largeIcon}
          <p>We couldn't find any connected {provider.name} accounts...</p>
          <ConnectDialog provider={provider}>
            Connect your first {provider.name} account
          </ConnectDialog>
        </div>
      )}
    </>
  )
}
