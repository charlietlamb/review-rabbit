'use client'

import React from 'react'
import { DashboardSidebarItem } from './data/dashboardSidebarItems'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@dubble/design-system/components/ui/sidebar'
import Link from 'next/link'
import { getIconWithClassName } from './functions/getIconWithClassName'

export default function DashboardSidebarMenuItem({
  item,
}: {
  item: DashboardSidebarItem
}) {
  const iconWithClassName = getIconWithClassName(item.icon, 'min-w-4 min-h-4')
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={item.href}
          className="mx-auto py-1 h-auto flex items-center"
          onClick={() => setOpenMobile(false)}
        >
          {iconWithClassName}
          <span className="text-base">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
